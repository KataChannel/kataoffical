import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

// Import all constants and interfaces
import {
  MAP_SIZE, TILE_SIZE_PX, RESOURCE_TYPES, RESOURCE_ICONS, SPIRIT_BEAST_ICONS,
  SOURCE_ICONS, NGU_HANH_RELATIONS, BASE_RESOURCE_YIELD, BASE_HARVEST_COOLDOWN_MS,
  UPGRADE_COSTS, SPIRIT_BEAST_BONUS_PER_LEVEL,
  GameState, ResourceState, Tile, Source, SpiritBeast, LogEntry
} from './constants';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-game1',
    imports: [
      CommonModule
    ],
    templateUrl: './game1.component.html',
    styleUrl: './game1.component.scss'
})
export class Game1Component implements OnInit, OnDestroy {
  // Game State properties
  public gameState: GameState;
  public notifications: LogEntry[] = [];
  public logs: LogEntry[] = [];
  public isAutoHarvesting: boolean = false;

  // RxJS Subscriptions
  private autoHarvestSubscription: Subscription | undefined;
  private logScrollSubscription: Subscription | undefined; // For logs to scroll

  // ViewChild for scrolling logs
  @ViewChild('activityLogScrollEnd') private activityLogScrollEnd!: ElementRef;

  // Expose constants and helper maps to template
  public mapSize = MAP_SIZE;
  public tileSizePx = TILE_SIZE_PX;
  public resourceTypes = RESOURCE_TYPES;
  public resourceIcons = RESOURCE_ICONS;
  public spiritBeastIcons = SPIRIT_BEAST_ICONS;
  public sourceIcons = SOURCE_ICONS;
  public nguHanhRelations = NGU_HANH_RELATIONS;
  public upgradeCosts = UPGRADE_COSTS;
  public baseResourceYield = BASE_RESOURCE_YIELD;
  public baseHarvestCooldownMs = BASE_HARVEST_COOLDOWN_MS;

  constructor() {
    // Load game state from localStorage or initialize new game
    const savedState = this.loadGame();
    this.gameState = savedState || this.initializeGame();
  }

  ngOnInit(): void {
    // Initial save on load (in case it's a new game)
    this.saveGame(this.gameState);

    // Set up auto-harvest if it was active on load
    if (this.isAutoHarvesting) {
      this.autoHarvestSubscription = interval(1000).subscribe(() => {
        this.performAutoHarvest();
      });
    }

    // Set up subscription for logs to scroll
    // This will be triggered whenever 'logs' array changes
    // In a single component, this might be less direct;
    // We'll call scrollToBottom directly in addLog.
  }

  ngOnDestroy(): void {
    this.autoHarvestSubscription?.unsubscribe();
  }

  // --- Game Logic Functions (moved from game.service.ts) ---

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private initializeGame(): GameState {
    const initialResources: ResourceState = { metal: 50, wood: 50, water: 50, fire: 50, earth: 50 };
    const initialMap: Tile[][] = Array.from({ length: MAP_SIZE }, (_, r) =>
      Array.from({ length: MAP_SIZE }, (_, c) => ({
        id: `${r}-${c}`,
        row: r,
        col: c,
        type: 'empty',
        isDiscovered: false,
        isActive: false,
      }))
    );

    const availablePositions: { r: number; c: number }[] = [];
    for (let r = 0; r < MAP_SIZE; r++) {
      for (let c = 0; c < MAP_SIZE; c++) {
        availablePositions.push({ r, c });
      }
    }

    const typesToPlace = [
      'metal_mine', 'wood_forest', 'water_spring', 'fire_forge', 'earth_field',
      'spirit_metal', 'spirit_wood', 'spirit_water', 'spirit_fire', 'spirit_earth'
    ];
    const actualTypesToPlace = typesToPlace.slice(0, Math.min(typesToPlace.length, MAP_SIZE * MAP_SIZE));

    const sources: { [key: string]: Source } = {};
    const spiritBeasts: { [key: string]: SpiritBeast } = {};

    actualTypesToPlace.forEach(type => {
      const randomIndex = this.getRandomInt(0, availablePositions.length - 1);
      const { r, c } = availablePositions.splice(randomIndex, 1)[0];

      initialMap[r][c].type = type;

      if (type.includes('_mine') || type.includes('_forest') || type.includes('_spring') || type.includes('_forge') || type.includes('_field')) {
        sources[type] = {
          type: type,
          level: 1,
          lastHarvestTime: 0,
          cooldown: BASE_HARVEST_COOLDOWN_MS,
          yield: BASE_RESOURCE_YIELD,
          isActive: false,
          row: r,
          col: c
        };
      } else if (type.includes('spirit_')) {
        spiritBeasts[type] = {
          type: type,
          level: 1,
          bonus: SPIRIT_BEAST_BONUS_PER_LEVEL,
          isActive: false,
          row: r,
          col: c
        };
      }
    });

    const metalMineType = 'metal_mine';
    let metalMineTile: Tile | null = null;
    for (let r = 0; r < MAP_SIZE; r++) {
      for (let c = 0; c < MAP_SIZE; c++) {
        if (initialMap[r][c].type === metalMineType) {
          metalMineTile = initialMap[r][c];
          break;
        }
      }
      if (metalMineTile) break;
    }

    if (!metalMineTile) {
        if (availablePositions.length > 0) {
            const { r, c } = availablePositions.splice(0, 1)[0];
            initialMap[r][c].type = metalMineType;
            metalMineTile = initialMap[r][c];
            sources[metalMineType] = {
                type: metalMineType,
                level: 1,
                lastHarvestTime: 0,
                cooldown: BASE_HARVEST_COOLDOWN_MS,
                yield: BASE_RESOURCE_YIELD,
                isActive: false,
                row: r,
                col: c
            };
        } else {
            console.error("No available positions for Metal Mine! This indicates a problem with map generation.");
        }
    }

    if (metalMineTile) {
      metalMineTile.isDiscovered = true;
      metalMineTile.isActive = true;
      sources[metalMineType].isActive = true;
    } else {
      console.error("Metal Mine still not found after fallback placement!");
    }

    return {
      map: initialMap,
      resources: initialResources,
      sources: sources,
      spiritBeasts: spiritBeasts,
      canHarvestOtherSources: false,
    };
  }

  private saveGame(gameState: GameState): void {
    try {
      const serializedState = JSON.stringify(gameState);
      localStorage.setItem('nguHanhGame', serializedState);
    } catch (error) {
      console.error("Error saving game to localStorage:", error);
    }
  }

  private loadGame(): GameState | undefined {
    try {
      const serializedState = localStorage.getItem('nguHanhGame');
      if (serializedState === null) {
        return undefined;
      }
      const loadedState: GameState = JSON.parse(serializedState);

      if (loadedState.sources && loadedState.sources['metal_mine'] && loadedState.sources['metal_mine'].lastHarvestTime > 0) {
        loadedState.canHarvestOtherSources = true;
      } else {
        loadedState.canHarvestOtherSources = false;
      }
      return loadedState;
    } catch (error) {
      console.error("Error loading game from localStorage:", error);
      return undefined;
    }
  }

  // --- Game Actions ---

  onTileClick(row: number, col: number): void {
    const tile = this.gameState.map[row][col];

    if (!tile.isDiscovered) {
      this.discoverTile(row, col);
    } else if (tile.isDiscovered && !tile.isActive && (tile.type !== 'empty')) {
      this.activateTile(row, col);
    }
    this.saveGame(this.gameState); // Save game state after any map interaction
  }

  private discoverTile(row: number, col: number): void {
    const newMap = this.gameState.map.map(rowArr => rowArr.map(tile => ({ ...tile })));
    const newResources = { ...this.gameState.resources };
    const tile = newMap[row][col];

    if (tile.isDiscovered) {
      this.addLog("Ô này đã được khám phá.", 'info');
      return;
    }

    let hasEnoughResources = true;
    const cost = this.getRandomInt(1, 5);

    RESOURCE_TYPES.forEach(type => {
      if (newResources[type as keyof ResourceState] < cost) {
        hasEnoughResources = false;
      }
    });

    if (!hasEnoughResources) {
      this.addLog(`Không đủ tài nguyên để khám phá ô này. Cần ${cost} của mỗi loại.`, 'error');
      return;
    }

    RESOURCE_TYPES.forEach(type => {
      newResources[type as keyof ResourceState] -= cost;
    });

    tile.isDiscovered = true;

    this.gameState = {
      ...this.gameState,
      map: newMap,
      resources: newResources,
    };
    this.addLog(`Đã khám phá ô tại (${row}, ${col}). Mất ${cost} tài nguyên mỗi loại.`, 'info');
  }

  private activateTile(row: number, col: number): void {
    const newMap = this.gameState.map.map(rowArr => rowArr.map(tile => ({ ...tile })));
    const newSources = { ...this.gameState.sources };
    const newSpiritBeasts = { ...this.gameState.spiritBeasts };
    const tile = newMap[row][col];

    if (!tile.isDiscovered || tile.isActive || tile.type === 'empty') {
      this.addLog("Không thể kích hoạt ô này.", 'error');
      return;
    }

    tile.isActive = true;
    let message = '';

    if (newSources[tile.type]) {
      newSources[tile.type].isActive = true;
      message = `Đã kích hoạt nguồn ${tile.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')}!`;
    } else if (newSpiritBeasts[tile.type]) {
      newSpiritBeasts[tile.type].isActive = true;
      message = `Đã kích hoạt linh thú ${tile.type.replace('spirit_', 'Linh Thú ')}!`;
    }

    this.gameState = {
      ...this.gameState,
      map: newMap,
      sources: newSources,
      spiritBeasts: newSpiritBeasts,
    };
    this.addLog(message, 'success');
  }

  public harvestSource(sourceKey: string): void {
    const newSources = { ...this.gameState.sources };
    const newResources = { ...this.gameState.resources };
    const source = newSources[sourceKey];

    if (!source || !source.isActive) {
      this.addLog("Nguồn này chưa được kích hoạt hoặc không tồn tại.", 'error');
      return;
    }

    const now = Date.now();
    if (source.lastHarvestTime + source.cooldown > now) {
      const remainingTime = Math.ceil((source.lastHarvestTime + source.cooldown - now) / 1000);
      this.addLog(`Nguồn này đang hồi chiêu. Chờ ${remainingTime} giây.`, 'info');
      return;
    }

    let canHarvestOthers = this.gameState.canHarvestOtherSources;
    if (sourceKey !== 'metal_mine' && !canHarvestOthers) {
      this.addLog("Bạn phải thu hoạch 'Mỏ Kim Loại' trước.", 'error');
      return;
    }

    if (sourceKey === 'metal_mine' && !canHarvestOthers) {
      canHarvestOthers = true;
    }

    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type as keyof typeof NGU_HANH_RELATIONS.elementMap];
    const generatedResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType as keyof typeof NGU_HANH_RELATIONS.generates];

    let actualYield = source.yield;
    const spiritBeastType = `spirit_${primaryResourceType}`;
    if (this.gameState.spiritBeasts[spiritBeastType] && this.gameState.spiritBeasts[spiritBeastType].isActive) {
      actualYield += actualYield * this.gameState.spiritBeasts[spiritBeastType].bonus;
    }
    actualYield = Math.floor(actualYield);

    newResources[primaryResourceType as keyof ResourceState] = (newResources[primaryResourceType as keyof ResourceState] || 0) + actualYield;
    newResources[generatedResourceType as keyof ResourceState] = (newResources[generatedResourceType as keyof ResourceState] || 0) + Math.floor(actualYield / 5);

    source.lastHarvestTime = now;

    this.gameState = {
      ...this.gameState,
      resources: newResources,
      sources: newSources,
      canHarvestOtherSources: canHarvestOthers,
    };
    this.addLog(`Đã thu hoạch ${actualYield} ${primaryResourceType} và ${Math.floor(actualYield / 5)} ${generatedResourceType} từ ${source.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')}!`, 'success');
  }

  public upgradeSource(sourceKey: string): void {
    const newSources = { ...this.gameState.sources };
    const newResources = { ...this.gameState.resources };
    const source = newSources[sourceKey];

    if (!source || !source.isActive) {
      this.addLog("Nguồn này chưa được kích hoạt hoặc không tồn tại.", 'error');
      return;
    }

    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type as keyof typeof NGU_HANH_RELATIONS.elementMap];
    const oppositeResourceType = NGU_HANH_RELATIONS.overcomes[primaryResourceType as keyof typeof NGU_HANH_RELATIONS.overcomes];

    const primaryCost = Math.floor(UPGRADE_COSTS.source.basePrimary * Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1));
    const oppositeCost = Math.floor(UPGRADE_COSTS.source.baseOpposite * Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1));

    if (newResources[primaryResourceType as keyof ResourceState] < primaryCost || newResources[oppositeResourceType as keyof ResourceState] < oppositeCost) {
      this.addLog(`Không đủ tài nguyên để nâng cấp. Cần ${primaryCost} ${primaryResourceType} và ${oppositeCost} ${oppositeResourceType}.`, 'error');
      return;
    }

    newResources[primaryResourceType as keyof ResourceState] -= primaryCost;
    newResources[oppositeResourceType as keyof ResourceState] -= oppositeCost;

    source.level += 1;
    source.yield += BASE_RESOURCE_YIELD * 0.5;
    source.cooldown = Math.max(BASE_HARVEST_COOLDOWN_MS * 0.8, source.cooldown * 0.9);

    this.gameState = {
      ...this.gameState,
      resources: newResources,
      sources: newSources,
    };
    this.addLog(`Đã nâng cấp ${source.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')} lên cấp ${source.level}!`, 'success');
  }

  public upgradeSpiritBeast(spiritBeastKey: string): void {
    const newSpiritBeasts = { ...this.gameState.spiritBeasts };
    const newResources = { ...this.gameState.resources };
    const spiritBeast = newSpiritBeasts[spiritBeastKey];

    if (!spiritBeast || !spiritBeast.isActive) {
      this.addLog("Linh thú này chưa được kích hoạt hoặc không tồn tại.", 'error');
      return;
    }

    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[spiritBeast.type as keyof typeof NGU_HANH_RELATIONS.elementMap];
    const generatesResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType as keyof typeof NGU_HANH_RELATIONS.generates];

    const primaryCost = Math.floor(UPGRADE_COSTS.spiritBeast.basePrimary * Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, spiritBeast.level - 1));
    const generatesCost = Math.floor(UPGRADE_COSTS.spiritBeast.baseGenerates * Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, spiritBeast.level - 1));

    if (newResources[primaryResourceType as keyof ResourceState] < primaryCost || newResources[generatesResourceType as keyof ResourceState] < generatesCost) {
      this.addLog(`Không đủ tài nguyên để nâng cấp. Cần ${primaryCost} ${primaryResourceType} và ${generatesCost} ${generatesResourceType}.`, 'error');
      return;
    }

    newResources[primaryResourceType as keyof ResourceState] -= primaryCost;
    newResources[generatesResourceType as keyof ResourceState] -= generatesCost;

    spiritBeast.level += 1;
    spiritBeast.bonus += SPIRIT_BEAST_BONUS_PER_LEVEL;

    this.gameState = {
      ...this.gameState,
      resources: newResources,
      spiritBeasts: newSpiritBeasts,
    };
    this.addLog(`Đã nâng cấp ${spiritBeast.type.replace('spirit_', 'Linh Thú ')} lên cấp ${spiritBeast.level}!`, 'success');
  }

  // --- Notification & Log Functions (moved from notification.service.ts) ---

  public addLog(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    const logEntry: LogEntry = { timestamp: Date.now(), message, type };

    // For temporary notifications (e.g., pop-up)
    this.notifications = [...this.notifications, logEntry];

    // Automatically remove temporary notification after 3 seconds
    setTimeout(() => {
      this.notifications = this.notifications.slice(1);
    }, 3000);

    // For persistent activity log
    this.logs = [...this.logs, logEntry];
    this.scrollToBottom(); // Scroll log to bottom when new log is added
  }

  private scrollToBottom(): void {
    // Use a slight delay to ensure content has rendered
    setTimeout(() => {
      if (this.activityLogScrollEnd) {
        this.activityLogScrollEnd.nativeElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }

  // --- Auto Harvest Logic ---

  public toggleAutoHarvest(): void {
    this.isAutoHarvesting = !this.isAutoHarvesting;

    if (this.isAutoHarvesting) {
      this.addLog("Đã bật chế độ thu hoạch tự động.", "info");
      this.autoHarvestSubscription = interval(1000).subscribe(() => {
        this.performAutoHarvest();
      });
    } else {
      this.addLog("Đã tắt chế độ thu hoạch tự động.", "info");
      this.autoHarvestSubscription?.unsubscribe();
      this.autoHarvestSubscription = undefined;
    }
  }

  private performAutoHarvest(): void {
    let currentGameState = { ...this.gameState };
    let harvestedAny = false;

    for (const sourceKey in currentGameState.sources) {
      const source = currentGameState.sources[sourceKey];
      const now = Date.now();

      const canHarvest = source.isActive &&
                         (source.lastHarvestTime + source.cooldown <= now) &&
                         (source.type === 'metal_mine' || currentGameState.canHarvestOtherSources);

      if (canHarvest) {
        // Perform harvest logic directly
        const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type as keyof typeof NGU_HANH_RELATIONS.elementMap];
        const generatedResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType as keyof typeof NGU_HANH_RELATIONS.generates];

        let actualYield = source.yield;
        const spiritBeastType = `spirit_${primaryResourceType}`;
        if (currentGameState.spiritBeasts[spiritBeastType] && currentGameState.spiritBeasts[spiritBeastType].isActive) {
          actualYield += actualYield * currentGameState.spiritBeasts[spiritBeastType].bonus;
        }
        actualYield = Math.floor(actualYield);

        currentGameState.resources = {
          ...currentGameState.resources,
          [primaryResourceType]: (currentGameState.resources[primaryResourceType as keyof ResourceState] || 0) + actualYield,
          [generatedResourceType]: (currentGameState.resources[generatedResourceType as keyof ResourceState] || 0) + Math.floor(actualYield / 5),
        };
        currentGameState.sources = {
          ...currentGameState.sources,
          [sourceKey]: {
            ...source,
            lastHarvestTime: now,
          },
        };
        if (sourceKey === 'metal_mine' && !currentGameState.canHarvestOtherSources) {
          currentGameState.canHarvestOtherSources = true;
        }

        this.addLog(`Đã thu hoạch ${actualYield} ${primaryResourceType} và ${Math.floor(actualYield / 5)} ${generatedResourceType} từ ${source.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')}!`, 'success');
        harvestedAny = true;
      }
    }

    if (harvestedAny) {
      this.gameState = currentGameState; // Only update if something was harvested
      this.saveGame(this.gameState); // Save after auto-harvest
    }
  }

  // --- Helper methods for template (moved from child components) ---

  // Helper for TileComponent
  getIconForTile(type: string): string {
    // This helper function needs access to all icon maps.
    // In a single component, we combine them for this helper.
    const allIcons = { ...RESOURCE_ICONS, ...SPIRIT_BEAST_ICONS, ...SOURCE_ICONS };
    return allIcons[type] || '';
  }

  // Helpers for SourcePanelComponent
  getSortedSources(): Source[] {
    return Object.values(this.gameState.sources).sort((a, b) => a.type.localeCompare(b.type));
  }

  getUpgradeCostsSource(source: Source): { primaryResourceType: string, oppositeResourceType: string, primaryCost: number, oppositeCost: number } {
    const primaryResourceType = this.nguHanhRelations.elementMap[source.type as keyof typeof this.nguHanhRelations.elementMap];
    const oppositeResourceType = this.nguHanhRelations.overcomes[primaryResourceType as keyof typeof this.nguHanhRelations.overcomes];
    const primaryCost = Math.floor(this.upgradeCosts.source.basePrimary * Math.pow(this.upgradeCosts.source.multiplier, source.level - 1));
    const oppositeCost = Math.floor(this.upgradeCosts.source.baseOpposite * Math.pow(this.upgradeCosts.source.multiplier, source.level - 1));
    return { primaryResourceType, oppositeResourceType, primaryCost, oppositeCost };
  }

  getCooldownRemaining(source: Source): number {
    const now = Date.now();
    return source.lastHarvestTime + source.cooldown > now ?
      Math.ceil((source.lastHarvestTime + source.cooldown - now) / 1000) : 0;
  }

  canHarvestCheck(source: Source): boolean {
    return this.getCooldownRemaining(source) === 0 && source.isActive && (source.type === 'metal_mine' || this.gameState.canHarvestOtherSources);
  }

  canUpgradeSourceCheck(source: Source): boolean {
    if (!this.gameState.resources || !source.isActive) return false;
    const { primaryResourceType, oppositeResourceType, primaryCost, oppositeCost } = this.getUpgradeCostsSource(source);
    return (this.gameState.resources[primaryResourceType as keyof ResourceState] >= primaryCost) && (this.gameState.resources[oppositeResourceType as keyof ResourceState] >= oppositeCost);
  }

  // Helpers for SpiritBeastPanelComponent
  getSortedSpiritBeasts(): SpiritBeast[] {
    return Object.values(this.gameState.spiritBeasts).sort((a, b) => a.type.localeCompare(b.type));
  }

  getUpgradeCostsSpiritBeast(beast: SpiritBeast): { primaryResourceType: string, generatesResourceType: string, primaryCost: number, generatesCost: number } {
    const primaryResourceType = this.nguHanhRelations.elementMap[beast.type as keyof typeof this.nguHanhRelations.elementMap];
    const generatesResourceType = this.nguHanhRelations.generates[primaryResourceType as keyof typeof this.nguHanhRelations.generates];
    const primaryCost = Math.floor(this.upgradeCosts.spiritBeast.basePrimary * Math.pow(this.upgradeCosts.spiritBeast.multiplier, beast.level - 1));
    const generatesCost = Math.floor(this.upgradeCosts.spiritBeast.baseGenerates * Math.pow(this.upgradeCosts.spiritBeast.multiplier, beast.level - 1));
    return { primaryResourceType, generatesResourceType, primaryCost, generatesCost };
  }

  canUpgradeSpiritBeastCheck(beast: SpiritBeast): boolean {
    if (!this.gameState.resources || !beast.isActive) return false;
    const { primaryResourceType, generatesResourceType, primaryCost, generatesCost } = this.getUpgradeCostsSpiritBeast(beast);
    return (this.gameState.resources[primaryResourceType as keyof ResourceState] >= primaryCost) && (this.gameState.resources[generatesResourceType as keyof ResourceState] >= generatesCost);
  }
}
