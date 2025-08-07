import {
  UserguideService
} from "./chunk-YSHAUWVW.js";
import {
  MatTabsModule
} from "./chunk-3FX3VELS.js";
import {
  UserService
} from "./chunk-XGCTO3IF.js";
import {
  ErrorLogService
} from "./chunk-UV2EYCAL.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef
} from "./chunk-YS6BOFHA.js";
import {
  MenuService
} from "./chunk-BP2JQXJN.js";
import {
  convertToSlug
} from "./chunk-657A73EG.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-3J77SWWE.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  ControlContainer,
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar,
  StorageService
} from "./chunk-WD36GM3Q.js";
import {
  CdkPortalOutlet,
  DataSource,
  PortalModule,
  SelectionModel,
  TemplatePortal,
  isDataSource
} from "./chunk-4E5W4BJX.js";
import {
  MatButtonModule,
  MatIconAnchor,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger
} from "./chunk-LD5X4C2B.js";
import {
  A,
  BidiModule,
  BreakpointObserver,
  Breakpoints,
  CdkObserveContent,
  Directionality,
  ENTER,
  ErrorStateMatcher,
  FocusKeyManager,
  FocusMonitor,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatCommonModule,
  MatPseudoCheckboxModule,
  MatRipple,
  MatRippleModule,
  ObserversModule,
  Platform,
  RippleRenderer,
  SPACE,
  TREE_KEY_MANAGER,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _StructuralStylesLoader,
  _VisuallyHiddenLoader,
  _getFocusedElementPierceShadowDom,
  coerceBooleanProperty,
  coerceNumberProperty,
  coerceObservable,
  hasModifierKey
} from "./chunk-GWKJMKCD.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-JGMWTFVW.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-E6DSVUBK.js";
import {
  ANIMATION_MODULE_TYPE,
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  HostAttributeToken,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  IterableDiffers,
  NgModule,
  NgZone,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SkipSelf,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
  booleanAttribute,
  combineLatest,
  concat,
  concatMap,
  distinctUntilChanged,
  forwardRef,
  inject,
  isObservable,
  map,
  merge,
  numberAttribute,
  of,
  reduce,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/adminmain/adminmain.ts
var Config = {
  Logoimage: "/images/logo-full.png"
};

// node_modules/@angular/cdk/fesm2022/tree.mjs
var BaseTreeControl = class {
  /** Saved data node for `expandAll` action. */
  dataNodes;
  /** A selection model with multi-selection to track expansion status. */
  expansionModel = new SelectionModel(true);
  /**
   * Returns the identifier by which a dataNode should be tracked, should its
   * reference change.
   *
   * Similar to trackBy for *ngFor
   */
  trackBy;
  /** Get depth of a given data node, return the level number. This is for flat tree node. */
  getLevel;
  /**
   * Whether the data node is expandable. Returns true if expandable.
   * This is for flat tree node.
   */
  isExpandable;
  /** Gets a stream that emits whenever the given data node's children change. */
  getChildren;
  /** Toggles one single data node's expanded/collapsed state. */
  toggle(dataNode) {
    this.expansionModel.toggle(this._trackByValue(dataNode));
  }
  /** Expands one single data node. */
  expand(dataNode) {
    this.expansionModel.select(this._trackByValue(dataNode));
  }
  /** Collapses one single data node. */
  collapse(dataNode) {
    this.expansionModel.deselect(this._trackByValue(dataNode));
  }
  /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
  isExpanded(dataNode) {
    return this.expansionModel.isSelected(this._trackByValue(dataNode));
  }
  /** Toggles a subtree rooted at `node` recursively. */
  toggleDescendants(dataNode) {
    this.expansionModel.isSelected(this._trackByValue(dataNode)) ? this.collapseDescendants(dataNode) : this.expandDescendants(dataNode);
  }
  /** Collapse all dataNodes in the tree. */
  collapseAll() {
    this.expansionModel.clear();
  }
  /** Expands a subtree rooted at given data node recursively. */
  expandDescendants(dataNode) {
    let toBeProcessed = [dataNode];
    toBeProcessed.push(...this.getDescendants(dataNode));
    this.expansionModel.select(...toBeProcessed.map((value) => this._trackByValue(value)));
  }
  /** Collapses a subtree rooted at given data node recursively. */
  collapseDescendants(dataNode) {
    let toBeProcessed = [dataNode];
    toBeProcessed.push(...this.getDescendants(dataNode));
    this.expansionModel.deselect(...toBeProcessed.map((value) => this._trackByValue(value)));
  }
  _trackByValue(value) {
    return this.trackBy ? this.trackBy(value) : value;
  }
};
var FlatTreeControl = class extends BaseTreeControl {
  getLevel;
  isExpandable;
  options;
  /** Construct with flat tree data node functions getLevel and isExpandable. */
  constructor(getLevel, isExpandable, options) {
    super();
    this.getLevel = getLevel;
    this.isExpandable = isExpandable;
    this.options = options;
    if (this.options) {
      this.trackBy = this.options.trackBy;
    }
  }
  /**
   * Gets a list of the data node's subtree of descendent data nodes.
   *
   * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
   * with correct levels.
   */
  getDescendants(dataNode) {
    const startIndex = this.dataNodes.indexOf(dataNode);
    const results = [];
    for (let i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
      results.push(this.dataNodes[i]);
    }
    return results;
  }
  /**
   * Expands all data nodes in the tree.
   *
   * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
   * data nodes of the tree.
   */
  expandAll() {
    this.expansionModel.select(...this.dataNodes.map((node) => this._trackByValue(node)));
  }
};
var CDK_TREE_NODE_OUTLET_NODE = new InjectionToken("CDK_TREE_NODE_OUTLET_NODE");
var CdkTreeNodeOutlet = class _CdkTreeNodeOutlet {
  viewContainer = inject(ViewContainerRef);
  _node = inject(CDK_TREE_NODE_OUTLET_NODE, {
    optional: true
  });
  constructor() {
  }
  static \u0275fac = function CdkTreeNodeOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodeOutlet)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodeOutlet,
    selectors: [["", "cdkTreeNodeOutlet", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodeOutlet, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodeOutlet]"
    }]
  }], () => [], null);
})();
var CdkTreeNodeOutletContext = class {
  /** Data for the node. */
  $implicit;
  /** Depth of the node. */
  level;
  /** Index location of the node. */
  index;
  /** Length of the number of total dataNodes. */
  count;
  constructor(data) {
    this.$implicit = data;
  }
};
var CdkTreeNodeDef = class _CdkTreeNodeDef {
  /** @docs-private */
  template = inject(TemplateRef);
  /**
   * Function that should return true if this node template should be used for the provided node
   * data and index. If left undefined, this node will be considered the default node template to
   * use when no other when functions return true for the data.
   * For every node, there must be at least one when function that passes or an undefined to
   * default.
   */
  when;
  constructor() {
  }
  static \u0275fac = function CdkTreeNodeDef_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodeDef)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodeDef,
    selectors: [["", "cdkTreeNodeDef", ""]],
    inputs: {
      when: [0, "cdkTreeNodeDefWhen", "when"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodeDef, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodeDef]",
      inputs: [{
        name: "when",
        alias: "cdkTreeNodeDefWhen"
      }]
    }]
  }], () => [], null);
})();
function getTreeNoValidDataSourceError() {
  return Error(`A valid data source must be provided.`);
}
function getTreeMultipleDefaultNodeDefsError() {
  return Error(`There can only be one default row without a when predicate function.`);
}
function getTreeMissingMatchingNodeDefError() {
  return Error(`Could not find a matching node definition for the provided node data.`);
}
function getTreeControlMissingError() {
  return Error(`Could not find a tree control, levelAccessor, or childrenAccessor for the tree.`);
}
function getMultipleTreeControlsError() {
  return Error(`More than one of tree control, levelAccessor, or childrenAccessor were provided.`);
}
var CdkTree = class _CdkTree {
  _differs = inject(IterableDiffers);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _dir = inject(Directionality);
  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject();
  /** Differ used to find the changes in the data provided by the data source. */
  _dataDiffer;
  /** Stores the node definition that does not have a when predicate. */
  _defaultNodeDef;
  /** Data subscription */
  _dataSubscription;
  /** Level of nodes */
  _levels = /* @__PURE__ */ new Map();
  /** The immediate parents for a node. This is `null` if there is no parent. */
  _parents = /* @__PURE__ */ new Map();
  /**
   * Nodes grouped into each set, which is a list of nodes displayed together in the DOM.
   *
   * Lookup key is the parent of a set. Root nodes have key of null.
   *
   * Values is a 'set' of tree nodes. Each tree node maps to a treeitem element. Sets are in the
   * order that it is rendered. Each set maps directly to aria-posinset and aria-setsize attributes.
   */
  _ariaSets = /* @__PURE__ */ new Map();
  /**
   * Provides a stream containing the latest data array to render. Influenced by the tree's
   * stream of view window (what dataNodes are currently on screen).
   * Data source can be an observable of data array, or a data array to render.
   */
  get dataSource() {
    return this._dataSource;
  }
  set dataSource(dataSource) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }
  _dataSource;
  /**
   * The tree controller
   *
   * @deprecated Use one of `levelAccessor` or `childrenAccessor` instead. To be removed in a
   * future version.
   * @breaking-change 21.0.0
   */
  treeControl;
  /**
   * Given a data node, determines what tree level the node is at.
   *
   * One of levelAccessor or childrenAccessor must be specified, not both.
   * This is enforced at run-time.
   */
  levelAccessor;
  /**
   * Given a data node, determines what the children of that node are.
   *
   * One of levelAccessor or childrenAccessor must be specified, not both.
   * This is enforced at run-time.
   */
  childrenAccessor;
  /**
   * Tracking function that will be used to check the differences in data changes. Used similarly
   * to `ngFor` `trackBy` function. Optimize node operations by identifying a node based on its data
   * relative to the function to know if a node should be added/removed/moved.
   * Accepts a function that takes two parameters, `index` and `item`.
   */
  trackBy;
  /**
   * Given a data node, determines the key by which we determine whether or not this node is expanded.
   */
  expansionKey;
  // Outlets within the tree's template where the dataNodes will be inserted.
  _nodeOutlet;
  /** The tree node template for the tree */
  _nodeDefs;
  // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
  //     Remove the MAX_VALUE in viewChange
  /**
   * Stream containing the latest information on what rows are being displayed on screen.
   * Can be used by the data source to as a heuristic of what data should be provided.
   */
  viewChange = new BehaviorSubject({
    start: 0,
    end: Number.MAX_VALUE
  });
  /** Keep track of which nodes are expanded. */
  _expansionModel;
  /**
   * Maintain a synchronous cache of flattened data nodes. This will only be
   * populated after initial render, and in certain cases, will be delayed due to
   * relying on Observable `getChildren` calls.
   */
  _flattenedNodes = new BehaviorSubject([]);
  /** The automatically determined node type for the tree. */
  _nodeType = new BehaviorSubject(null);
  /** The mapping between data and the node that is rendered. */
  _nodes = new BehaviorSubject(/* @__PURE__ */ new Map());
  /**
   * Synchronous cache of nodes for the `TreeKeyManager`. This is separate
   * from `_flattenedNodes` so they can be independently updated at different
   * times.
   */
  _keyManagerNodes = new BehaviorSubject([]);
  _keyManagerFactory = inject(TREE_KEY_MANAGER);
  /** The key manager for this tree. Handles focus and activation based on user keyboard input. */
  _keyManager;
  _viewInit = false;
  constructor() {
  }
  ngAfterContentInit() {
    this._initializeKeyManager();
  }
  ngAfterContentChecked() {
    this._updateDefaultNodeDefinition();
    this._subscribeToDataChanges();
  }
  ngOnDestroy() {
    this._nodeOutlet.viewContainer.clear();
    this.viewChange.complete();
    this._onDestroy.next();
    this._onDestroy.complete();
    if (this._dataSource && typeof this._dataSource.disconnect === "function") {
      this.dataSource.disconnect(this);
    }
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    this._keyManager?.destroy();
  }
  ngOnInit() {
    this._checkTreeControlUsage();
    this._initializeDataDiffer();
  }
  ngAfterViewInit() {
    this._viewInit = true;
  }
  _updateDefaultNodeDefinition() {
    const defaultNodeDefs = this._nodeDefs.filter((def) => !def.when);
    if (defaultNodeDefs.length > 1 && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getTreeMultipleDefaultNodeDefsError();
    }
    this._defaultNodeDef = defaultNodeDefs[0];
  }
  /**
   * Sets the node type for the tree, if it hasn't been set yet.
   *
   * This will be called by the first node that's rendered in order for the tree
   * to determine what data transformations are required.
   */
  _setNodeTypeIfUnset(newType) {
    const currentType = this._nodeType.value;
    if (currentType === null) {
      this._nodeType.next(newType);
    } else if ((typeof ngDevMode === "undefined" || ngDevMode) && currentType !== newType) {
      console.warn(`Tree is using conflicting node types which can cause unexpected behavior. Please use tree nodes of the same type (e.g. only flat or only nested). Current node type: "${currentType}", new node type "${newType}".`);
    }
  }
  /**
   * Switch to the provided data source by resetting the data and unsubscribing from the current
   * render change subscription if one exists. If the data source is null, interpret this by
   * clearing the node outlet. Otherwise start listening for new data.
   */
  _switchDataSource(dataSource) {
    if (this._dataSource && typeof this._dataSource.disconnect === "function") {
      this.dataSource.disconnect(this);
    }
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    if (!dataSource) {
      this._nodeOutlet.viewContainer.clear();
    }
    this._dataSource = dataSource;
    if (this._nodeDefs) {
      this._subscribeToDataChanges();
    }
  }
  _getExpansionModel() {
    if (!this.treeControl) {
      this._expansionModel ??= new SelectionModel(true);
      return this._expansionModel;
    }
    return this.treeControl.expansionModel;
  }
  /** Set up a subscription for the data provided by the data source. */
  _subscribeToDataChanges() {
    if (this._dataSubscription) {
      return;
    }
    let dataStream;
    if (isDataSource(this._dataSource)) {
      dataStream = this._dataSource.connect(this);
    } else if (isObservable(this._dataSource)) {
      dataStream = this._dataSource;
    } else if (Array.isArray(this._dataSource)) {
      dataStream = of(this._dataSource);
    }
    if (!dataStream) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        throw getTreeNoValidDataSourceError();
      }
      return;
    }
    this._dataSubscription = this._getRenderData(dataStream).pipe(takeUntil(this._onDestroy)).subscribe((renderingData) => {
      this._renderDataChanges(renderingData);
    });
  }
  /** Given an Observable containing a stream of the raw data, returns an Observable containing the RenderingData */
  _getRenderData(dataStream) {
    const expansionModel = this._getExpansionModel();
    return combineLatest([
      dataStream,
      this._nodeType,
      // We don't use the expansion data directly, however we add it here to essentially
      // trigger data rendering when expansion changes occur.
      expansionModel.changed.pipe(startWith(null), tap((expansionChanges) => {
        this._emitExpansionChanges(expansionChanges);
      }))
    ]).pipe(switchMap(([data, nodeType]) => {
      if (nodeType === null) {
        return of({
          renderNodes: data,
          flattenedNodes: null,
          nodeType
        });
      }
      return this._computeRenderingData(data, nodeType).pipe(map((convertedData) => __spreadProps(__spreadValues({}, convertedData), {
        nodeType
      })));
    }));
  }
  _renderDataChanges(data) {
    if (data.nodeType === null) {
      this.renderNodeChanges(data.renderNodes);
      return;
    }
    this._updateCachedData(data.flattenedNodes);
    this.renderNodeChanges(data.renderNodes);
    this._updateKeyManagerItems(data.flattenedNodes);
  }
  _emitExpansionChanges(expansionChanges) {
    if (!expansionChanges) {
      return;
    }
    const nodes = this._nodes.value;
    for (const added of expansionChanges.added) {
      const node = nodes.get(added);
      node?._emitExpansionState(true);
    }
    for (const removed of expansionChanges.removed) {
      const node = nodes.get(removed);
      node?._emitExpansionState(false);
    }
  }
  _initializeKeyManager() {
    const items = combineLatest([this._keyManagerNodes, this._nodes]).pipe(map(([keyManagerNodes, renderNodes]) => keyManagerNodes.reduce((items2, data) => {
      const node = renderNodes.get(this._getExpansionKey(data));
      if (node) {
        items2.push(node);
      }
      return items2;
    }, [])));
    const keyManagerOptions = {
      trackBy: (node) => this._getExpansionKey(node.data),
      skipPredicate: (node) => !!node.isDisabled,
      typeAheadDebounceInterval: true,
      horizontalOrientation: this._dir.value
    };
    this._keyManager = this._keyManagerFactory(items, keyManagerOptions);
  }
  _initializeDataDiffer() {
    const trackBy = this.trackBy ?? ((_index, item) => this._getExpansionKey(item));
    this._dataDiffer = this._differs.find([]).create(trackBy);
  }
  _checkTreeControlUsage() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      let numTreeControls = 0;
      if (this.treeControl) {
        numTreeControls++;
      }
      if (this.levelAccessor) {
        numTreeControls++;
      }
      if (this.childrenAccessor) {
        numTreeControls++;
      }
      if (!numTreeControls) {
        throw getTreeControlMissingError();
      } else if (numTreeControls > 1) {
        throw getMultipleTreeControlsError();
      }
    }
  }
  /** Check for changes made in the data and render each change (node added/removed/moved). */
  renderNodeChanges(data, dataDiffer = this._dataDiffer, viewContainer = this._nodeOutlet.viewContainer, parentData) {
    const changes = dataDiffer.diff(data);
    if (!changes && !this._viewInit) {
      return;
    }
    changes?.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
      if (item.previousIndex == null) {
        this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
      } else if (currentIndex == null) {
        viewContainer.remove(adjustedPreviousIndex);
      } else {
        const view = viewContainer.get(adjustedPreviousIndex);
        viewContainer.move(view, currentIndex);
      }
    });
    changes?.forEachIdentityChange((record) => {
      const newData = record.item;
      if (record.currentIndex != void 0) {
        const view = viewContainer.get(record.currentIndex);
        view.context.$implicit = newData;
      }
    });
    if (parentData) {
      this._changeDetectorRef.markForCheck();
    } else {
      this._changeDetectorRef.detectChanges();
    }
  }
  /**
   * Finds the matching node definition that should be used for this node data. If there is only
   * one node definition, it is returned. Otherwise, find the node definition that has a when
   * predicate that returns true with the data. If none return true, return the default node
   * definition.
   */
  _getNodeDef(data, i) {
    if (this._nodeDefs.length === 1) {
      return this._nodeDefs.first;
    }
    const nodeDef = this._nodeDefs.find((def) => def.when && def.when(i, data)) || this._defaultNodeDef;
    if (!nodeDef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getTreeMissingMatchingNodeDefError();
    }
    return nodeDef;
  }
  /**
   * Create the embedded view for the data node template and place it in the correct index location
   * within the data node view container.
   */
  insertNode(nodeData, index, viewContainer, parentData) {
    const levelAccessor = this._getLevelAccessor();
    const node = this._getNodeDef(nodeData, index);
    const key = this._getExpansionKey(nodeData);
    const context = new CdkTreeNodeOutletContext(nodeData);
    parentData ??= this._parents.get(key) ?? void 0;
    if (levelAccessor) {
      context.level = levelAccessor(nodeData);
    } else if (parentData !== void 0 && this._levels.has(this._getExpansionKey(parentData))) {
      context.level = this._levels.get(this._getExpansionKey(parentData)) + 1;
    } else {
      context.level = 0;
    }
    this._levels.set(key, context.level);
    const container = viewContainer ? viewContainer : this._nodeOutlet.viewContainer;
    container.createEmbeddedView(node.template, context, index);
    if (CdkTreeNode.mostRecentTreeNode) {
      CdkTreeNode.mostRecentTreeNode.data = nodeData;
    }
  }
  /** Whether the data node is expanded or collapsed. Returns true if it's expanded. */
  isExpanded(dataNode) {
    return !!(this.treeControl?.isExpanded(dataNode) || this._expansionModel?.isSelected(this._getExpansionKey(dataNode)));
  }
  /** If the data node is currently expanded, collapse it. Otherwise, expand it. */
  toggle(dataNode) {
    if (this.treeControl) {
      this.treeControl.toggle(dataNode);
    } else if (this._expansionModel) {
      this._expansionModel.toggle(this._getExpansionKey(dataNode));
    }
  }
  /** Expand the data node. If it is already expanded, does nothing. */
  expand(dataNode) {
    if (this.treeControl) {
      this.treeControl.expand(dataNode);
    } else if (this._expansionModel) {
      this._expansionModel.select(this._getExpansionKey(dataNode));
    }
  }
  /** Collapse the data node. If it is already collapsed, does nothing. */
  collapse(dataNode) {
    if (this.treeControl) {
      this.treeControl.collapse(dataNode);
    } else if (this._expansionModel) {
      this._expansionModel.deselect(this._getExpansionKey(dataNode));
    }
  }
  /**
   * If the data node is currently expanded, collapse it and all its descendants.
   * Otherwise, expand it and all its descendants.
   */
  toggleDescendants(dataNode) {
    if (this.treeControl) {
      this.treeControl.toggleDescendants(dataNode);
    } else if (this._expansionModel) {
      if (this.isExpanded(dataNode)) {
        this.collapseDescendants(dataNode);
      } else {
        this.expandDescendants(dataNode);
      }
    }
  }
  /**
   * Expand the data node and all its descendants. If they are already expanded, does nothing.
   */
  expandDescendants(dataNode) {
    if (this.treeControl) {
      this.treeControl.expandDescendants(dataNode);
    } else if (this._expansionModel) {
      const expansionModel = this._expansionModel;
      expansionModel.select(this._getExpansionKey(dataNode));
      this._getDescendants(dataNode).pipe(take(1), takeUntil(this._onDestroy)).subscribe((children) => {
        expansionModel.select(...children.map((child) => this._getExpansionKey(child)));
      });
    }
  }
  /** Collapse the data node and all its descendants. If it is already collapsed, does nothing. */
  collapseDescendants(dataNode) {
    if (this.treeControl) {
      this.treeControl.collapseDescendants(dataNode);
    } else if (this._expansionModel) {
      const expansionModel = this._expansionModel;
      expansionModel.deselect(this._getExpansionKey(dataNode));
      this._getDescendants(dataNode).pipe(take(1), takeUntil(this._onDestroy)).subscribe((children) => {
        expansionModel.deselect(...children.map((child) => this._getExpansionKey(child)));
      });
    }
  }
  /** Expands all data nodes in the tree. */
  expandAll() {
    if (this.treeControl) {
      this.treeControl.expandAll();
    } else if (this._expansionModel) {
      this._forEachExpansionKey((keys) => this._expansionModel?.select(...keys));
    }
  }
  /** Collapse all data nodes in the tree. */
  collapseAll() {
    if (this.treeControl) {
      this.treeControl.collapseAll();
    } else if (this._expansionModel) {
      this._forEachExpansionKey((keys) => this._expansionModel?.deselect(...keys));
    }
  }
  /** Level accessor, used for compatibility between the old Tree and new Tree */
  _getLevelAccessor() {
    return this.treeControl?.getLevel?.bind(this.treeControl) ?? this.levelAccessor;
  }
  /** Children accessor, used for compatibility between the old Tree and new Tree */
  _getChildrenAccessor() {
    return this.treeControl?.getChildren?.bind(this.treeControl) ?? this.childrenAccessor;
  }
  /**
   * Gets the direct children of a node; used for compatibility between the old tree and the
   * new tree.
   */
  _getDirectChildren(dataNode) {
    const levelAccessor = this._getLevelAccessor();
    const expansionModel = this._expansionModel ?? this.treeControl?.expansionModel;
    if (!expansionModel) {
      return of([]);
    }
    const key = this._getExpansionKey(dataNode);
    const isExpanded = expansionModel.changed.pipe(switchMap((changes) => {
      if (changes.added.includes(key)) {
        return of(true);
      } else if (changes.removed.includes(key)) {
        return of(false);
      }
      return EMPTY;
    }), startWith(this.isExpanded(dataNode)));
    if (levelAccessor) {
      return combineLatest([isExpanded, this._flattenedNodes]).pipe(map(([expanded, flattenedNodes]) => {
        if (!expanded) {
          return [];
        }
        return this._findChildrenByLevel(levelAccessor, flattenedNodes, dataNode, 1);
      }));
    }
    const childrenAccessor = this._getChildrenAccessor();
    if (childrenAccessor) {
      return coerceObservable(childrenAccessor(dataNode) ?? []);
    }
    throw getTreeControlMissingError();
  }
  /**
   * Given the list of flattened nodes, the level accessor, and the level range within
   * which to consider children, finds the children for a given node.
   *
   * For example, for direct children, `levelDelta` would be 1. For all descendants,
   * `levelDelta` would be Infinity.
   */
  _findChildrenByLevel(levelAccessor, flattenedNodes, dataNode, levelDelta) {
    const key = this._getExpansionKey(dataNode);
    const startIndex = flattenedNodes.findIndex((node) => this._getExpansionKey(node) === key);
    const dataNodeLevel = levelAccessor(dataNode);
    const expectedLevel = dataNodeLevel + levelDelta;
    const results = [];
    for (let i = startIndex + 1; i < flattenedNodes.length; i++) {
      const currentLevel = levelAccessor(flattenedNodes[i]);
      if (currentLevel <= dataNodeLevel) {
        break;
      }
      if (currentLevel <= expectedLevel) {
        results.push(flattenedNodes[i]);
      }
    }
    return results;
  }
  /**
   * Adds the specified node component to the tree's internal registry.
   *
   * This primarily facilitates keyboard navigation.
   */
  _registerNode(node) {
    this._nodes.value.set(this._getExpansionKey(node.data), node);
    this._nodes.next(this._nodes.value);
  }
  /** Removes the specified node component from the tree's internal registry. */
  _unregisterNode(node) {
    this._nodes.value.delete(this._getExpansionKey(node.data));
    this._nodes.next(this._nodes.value);
  }
  /**
   * For the given node, determine the level where this node appears in the tree.
   *
   * This is intended to be used for `aria-level` but is 0-indexed.
   */
  _getLevel(node) {
    return this._levels.get(this._getExpansionKey(node));
  }
  /**
   * For the given node, determine the size of the parent's child set.
   *
   * This is intended to be used for `aria-setsize`.
   */
  _getSetSize(dataNode) {
    const set = this._getAriaSet(dataNode);
    return set.length;
  }
  /**
   * For the given node, determine the index (starting from 1) of the node in its parent's child set.
   *
   * This is intended to be used for `aria-posinset`.
   */
  _getPositionInSet(dataNode) {
    const set = this._getAriaSet(dataNode);
    const key = this._getExpansionKey(dataNode);
    return set.findIndex((node) => this._getExpansionKey(node) === key) + 1;
  }
  /** Given a CdkTreeNode, gets the node that renders that node's parent's data. */
  _getNodeParent(node) {
    const parent = this._parents.get(this._getExpansionKey(node.data));
    return parent && this._nodes.value.get(this._getExpansionKey(parent));
  }
  /** Given a CdkTreeNode, gets the nodes that renders that node's child data. */
  _getNodeChildren(node) {
    return this._getDirectChildren(node.data).pipe(map((children) => children.reduce((nodes, child) => {
      const value = this._nodes.value.get(this._getExpansionKey(child));
      if (value) {
        nodes.push(value);
      }
      return nodes;
    }, [])));
  }
  /** `keydown` event handler; this just passes the event to the `TreeKeyManager`. */
  _sendKeydownToKeyManager(event) {
    if (event.target === this._elementRef.nativeElement) {
      this._keyManager.onKeydown(event);
    } else {
      const nodes = this._nodes.getValue();
      for (const [, node] of nodes) {
        if (event.target === node._elementRef.nativeElement) {
          this._keyManager.onKeydown(event);
          break;
        }
      }
    }
  }
  /** Gets all nested descendants of a given node. */
  _getDescendants(dataNode) {
    if (this.treeControl) {
      return of(this.treeControl.getDescendants(dataNode));
    }
    if (this.levelAccessor) {
      const results = this._findChildrenByLevel(this.levelAccessor, this._flattenedNodes.value, dataNode, Infinity);
      return of(results);
    }
    if (this.childrenAccessor) {
      return this._getAllChildrenRecursively(dataNode).pipe(reduce((allChildren, nextChildren) => {
        allChildren.push(...nextChildren);
        return allChildren;
      }, []));
    }
    throw getTreeControlMissingError();
  }
  /**
   * Gets all children and sub-children of the provided node.
   *
   * This will emit multiple times, in the order that the children will appear
   * in the tree, and can be combined with a `reduce` operator.
   */
  _getAllChildrenRecursively(dataNode) {
    if (!this.childrenAccessor) {
      return of([]);
    }
    return coerceObservable(this.childrenAccessor(dataNode)).pipe(take(1), switchMap((children) => {
      for (const child of children) {
        this._parents.set(this._getExpansionKey(child), dataNode);
      }
      return of(...children).pipe(concatMap((child) => concat(of([child]), this._getAllChildrenRecursively(child))));
    }));
  }
  _getExpansionKey(dataNode) {
    return this.expansionKey?.(dataNode) ?? dataNode;
  }
  _getAriaSet(node) {
    const key = this._getExpansionKey(node);
    const parent = this._parents.get(key);
    const parentKey = parent ? this._getExpansionKey(parent) : null;
    const set = this._ariaSets.get(parentKey);
    return set ?? [node];
  }
  /**
   * Finds the parent for the given node. If this is a root node, this
   * returns null. If we're unable to determine the parent, for example,
   * if we don't have cached node data, this returns undefined.
   */
  _findParentForNode(node, index, cachedNodes) {
    if (!cachedNodes.length) {
      return null;
    }
    const currentLevel = this._levels.get(this._getExpansionKey(node)) ?? 0;
    for (let parentIndex = index - 1; parentIndex >= 0; parentIndex--) {
      const parentNode = cachedNodes[parentIndex];
      const parentLevel = this._levels.get(this._getExpansionKey(parentNode)) ?? 0;
      if (parentLevel < currentLevel) {
        return parentNode;
      }
    }
    return null;
  }
  /**
   * Given a set of root nodes and the current node level, flattens any nested
   * nodes into a single array.
   *
   * If any nodes are not expanded, then their children will not be added into the array.
   * This will still traverse all nested children in order to build up our internal data
   * models, but will not include them in the returned array.
   */
  _flattenNestedNodesWithExpansion(nodes, level = 0) {
    const childrenAccessor = this._getChildrenAccessor();
    if (!childrenAccessor) {
      return of([...nodes]);
    }
    return of(...nodes).pipe(concatMap((node) => {
      const parentKey = this._getExpansionKey(node);
      if (!this._parents.has(parentKey)) {
        this._parents.set(parentKey, null);
      }
      this._levels.set(parentKey, level);
      const children = coerceObservable(childrenAccessor(node));
      return concat(of([node]), children.pipe(take(1), tap((childNodes) => {
        this._ariaSets.set(parentKey, [...childNodes ?? []]);
        for (const child of childNodes ?? []) {
          const childKey = this._getExpansionKey(child);
          this._parents.set(childKey, node);
          this._levels.set(childKey, level + 1);
        }
      }), switchMap((childNodes) => {
        if (!childNodes) {
          return of([]);
        }
        return this._flattenNestedNodesWithExpansion(childNodes, level + 1).pipe(map((nestedNodes) => this.isExpanded(node) ? nestedNodes : []));
      })));
    }), reduce((results, children) => {
      results.push(...children);
      return results;
    }, []));
  }
  /**
   * Converts children for certain tree configurations.
   *
   * This also computes parent, level, and group data.
   */
  _computeRenderingData(nodes, nodeType) {
    if (this.childrenAccessor && nodeType === "flat") {
      this._ariaSets.set(null, [...nodes]);
      return this._flattenNestedNodesWithExpansion(nodes).pipe(map((flattenedNodes) => ({
        renderNodes: flattenedNodes,
        flattenedNodes
      })));
    } else if (this.levelAccessor && nodeType === "nested") {
      const levelAccessor = this.levelAccessor;
      return of(nodes.filter((node) => levelAccessor(node) === 0)).pipe(map((rootNodes) => ({
        renderNodes: rootNodes,
        flattenedNodes: nodes
      })), tap(({
        flattenedNodes
      }) => {
        this._calculateParents(flattenedNodes);
      }));
    } else if (nodeType === "flat") {
      return of({
        renderNodes: nodes,
        flattenedNodes: nodes
      }).pipe(tap(({
        flattenedNodes
      }) => {
        this._calculateParents(flattenedNodes);
      }));
    } else {
      this._ariaSets.set(null, [...nodes]);
      return this._flattenNestedNodesWithExpansion(nodes).pipe(map((flattenedNodes) => ({
        renderNodes: nodes,
        flattenedNodes
      })));
    }
  }
  _updateCachedData(flattenedNodes) {
    this._flattenedNodes.next(flattenedNodes);
  }
  _updateKeyManagerItems(flattenedNodes) {
    this._keyManagerNodes.next(flattenedNodes);
  }
  /** Traverse the flattened node data and compute parents, levels, and group data. */
  _calculateParents(flattenedNodes) {
    const levelAccessor = this._getLevelAccessor();
    if (!levelAccessor) {
      return;
    }
    this._parents.clear();
    this._ariaSets.clear();
    for (let index = 0; index < flattenedNodes.length; index++) {
      const dataNode = flattenedNodes[index];
      const key = this._getExpansionKey(dataNode);
      this._levels.set(key, levelAccessor(dataNode));
      const parent = this._findParentForNode(dataNode, index, flattenedNodes);
      this._parents.set(key, parent);
      const parentKey = parent ? this._getExpansionKey(parent) : null;
      const group2 = this._ariaSets.get(parentKey) ?? [];
      group2.splice(index, 0, dataNode);
      this._ariaSets.set(parentKey, group2);
    }
  }
  /** Invokes a callback with all node expansion keys. */
  _forEachExpansionKey(callback) {
    const toToggle = [];
    const observables = [];
    this._nodes.value.forEach((node) => {
      toToggle.push(this._getExpansionKey(node.data));
      observables.push(this._getDescendants(node.data));
    });
    if (observables.length > 0) {
      combineLatest(observables).pipe(take(1), takeUntil(this._onDestroy)).subscribe((results) => {
        results.forEach((inner) => inner.forEach((r) => toToggle.push(this._getExpansionKey(r))));
        callback(toToggle);
      });
    } else {
      callback(toToggle);
    }
  }
  static \u0275fac = function CdkTree_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTree)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CdkTree,
    selectors: [["cdk-tree"]],
    contentQueries: function CdkTree_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, CdkTreeNodeDef, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nodeDefs = _t);
      }
    },
    viewQuery: function CdkTree_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(CdkTreeNodeOutlet, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nodeOutlet = _t.first);
      }
    },
    hostAttrs: ["role", "tree", 1, "cdk-tree"],
    hostBindings: function CdkTree_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown", function CdkTree_keydown_HostBindingHandler($event) {
          return ctx._sendKeydownToKeyManager($event);
        });
      }
    },
    inputs: {
      dataSource: "dataSource",
      treeControl: "treeControl",
      levelAccessor: "levelAccessor",
      childrenAccessor: "childrenAccessor",
      trackBy: "trackBy",
      expansionKey: "expansionKey"
    },
    exportAs: ["cdkTree"],
    decls: 1,
    vars: 0,
    consts: [["cdkTreeNodeOutlet", ""]],
    template: function CdkTree_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0, 0);
      }
    },
    dependencies: [CdkTreeNodeOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTree, [{
    type: Component,
    args: [{
      selector: "cdk-tree",
      exportAs: "cdkTree",
      template: `<ng-container cdkTreeNodeOutlet></ng-container>`,
      host: {
        "class": "cdk-tree",
        "role": "tree",
        "(keydown)": "_sendKeydownToKeyManager($event)"
      },
      encapsulation: ViewEncapsulation.None,
      // The "OnPush" status for the `CdkTree` component is effectively a noop, so we are removing it.
      // The view for `CdkTree` consists entirely of templates declared in other views. As they are
      // declared elsewhere, they are checked when their declaration points are checked.
      // tslint:disable-next-line:validate-decorators
      changeDetection: ChangeDetectionStrategy.Default,
      imports: [CdkTreeNodeOutlet]
    }]
  }], () => [], {
    dataSource: [{
      type: Input
    }],
    treeControl: [{
      type: Input
    }],
    levelAccessor: [{
      type: Input
    }],
    childrenAccessor: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    expansionKey: [{
      type: Input
    }],
    _nodeOutlet: [{
      type: ViewChild,
      args: [CdkTreeNodeOutlet, {
        static: true
      }]
    }],
    _nodeDefs: [{
      type: ContentChildren,
      args: [CdkTreeNodeDef, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }]
  });
})();
var CdkTreeNode = class _CdkTreeNode {
  _elementRef = inject(ElementRef);
  _tree = inject(CdkTree);
  _tabindex = -1;
  _type = "flat";
  /**
   * The role of the tree node.
   *
   * @deprecated This will be ignored; the tree will automatically determine the appropriate role
   * for tree node. This input will be removed in a future version.
   * @breaking-change 21.0.0
   */
  get role() {
    return "treeitem";
  }
  set role(_role) {
  }
  /**
   * Whether or not this node is expandable.
   *
   * If not using `FlatTreeControl`, or if `isExpandable` is not provided to
   * `NestedTreeControl`, this should be provided for correct node a11y.
   */
  get isExpandable() {
    return this._isExpandable();
  }
  set isExpandable(isExpandable) {
    this._inputIsExpandable = isExpandable;
    if (this.data && !this._isExpandable || !this._inputIsExpandable) {
      return;
    }
    if (this._inputIsExpanded) {
      this.expand();
    } else if (this._inputIsExpanded === false) {
      this.collapse();
    }
  }
  get isExpanded() {
    return this._tree.isExpanded(this._data);
  }
  set isExpanded(isExpanded) {
    this._inputIsExpanded = isExpanded;
    if (isExpanded) {
      this.expand();
    } else {
      this.collapse();
    }
  }
  /**
   * Whether or not this node is disabled. If it's disabled, then the user won't be able to focus
   * or activate this node.
   */
  isDisabled;
  /**
   * The text used to locate this item during typeahead. If not specified, the `textContent` will
   * will be used.
   */
  typeaheadLabel;
  getLabel() {
    return this.typeaheadLabel || this._elementRef.nativeElement.textContent?.trim() || "";
  }
  /** This emits when the node has been programatically activated or activated by keyboard. */
  activation = new EventEmitter();
  /** This emits when the node's expansion status has been changed. */
  expandedChange = new EventEmitter();
  /**
   * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
   * in `CdkTree` and set the data to it.
   */
  static mostRecentTreeNode = null;
  /** Subject that emits when the component has been destroyed. */
  _destroyed = new Subject();
  /** Emits when the node's data has changed. */
  _dataChanges = new Subject();
  _inputIsExpandable = false;
  _inputIsExpanded = void 0;
  /**
   * Flag used to determine whether or not we should be focusing the actual element based on
   * some user interaction (click or focus). On click, we don't forcibly focus the element
   * since the click could trigger some other component that wants to grab its own focus
   * (e.g. menu, dialog).
   */
  _shouldFocus = true;
  _parentNodeAriaLevel;
  /** The tree node's data. */
  get data() {
    return this._data;
  }
  set data(value) {
    if (value !== this._data) {
      this._data = value;
      this._dataChanges.next();
    }
  }
  _data;
  /* If leaf node, return true to not assign aria-expanded attribute */
  get isLeafNode() {
    if (this._tree.treeControl?.isExpandable !== void 0 && !this._tree.treeControl.isExpandable(this._data)) {
      return true;
    } else if (this._tree.treeControl?.isExpandable === void 0 && this._tree.treeControl?.getDescendants(this._data).length === 0) {
      return true;
    }
    return false;
  }
  get level() {
    return this._tree._getLevel(this._data) ?? this._parentNodeAriaLevel;
  }
  /** Determines if the tree node is expandable. */
  _isExpandable() {
    if (this._tree.treeControl) {
      if (this.isLeafNode) {
        return false;
      }
      return true;
    }
    return this._inputIsExpandable;
  }
  /**
   * Determines the value for `aria-expanded`.
   *
   * For non-expandable nodes, this is `null`.
   */
  _getAriaExpanded() {
    if (!this._isExpandable()) {
      return null;
    }
    return String(this.isExpanded);
  }
  /**
   * Determines the size of this node's parent's child set.
   *
   * This is intended to be used for `aria-setsize`.
   */
  _getSetSize() {
    return this._tree._getSetSize(this._data);
  }
  /**
   * Determines the index (starting from 1) of this node in its parent's child set.
   *
   * This is intended to be used for `aria-posinset`.
   */
  _getPositionInSet() {
    return this._tree._getPositionInSet(this._data);
  }
  _changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    _CdkTreeNode.mostRecentTreeNode = this;
  }
  ngOnInit() {
    this._parentNodeAriaLevel = getParentNodeAriaLevel(this._elementRef.nativeElement);
    this._tree._getExpansionModel().changed.pipe(map(() => this.isExpanded), distinctUntilChanged()).subscribe(() => this._changeDetectorRef.markForCheck());
    this._tree._setNodeTypeIfUnset(this._type);
    this._tree._registerNode(this);
  }
  ngOnDestroy() {
    if (_CdkTreeNode.mostRecentTreeNode === this) {
      _CdkTreeNode.mostRecentTreeNode = null;
    }
    this._dataChanges.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
  getParent() {
    return this._tree._getNodeParent(this) ?? null;
  }
  getChildren() {
    return this._tree._getNodeChildren(this);
  }
  /** Focuses this data node. Implemented for TreeKeyManagerItem. */
  focus() {
    this._tabindex = 0;
    if (this._shouldFocus) {
      this._elementRef.nativeElement.focus();
    }
    this._changeDetectorRef.markForCheck();
  }
  /** Defocus this data node. */
  unfocus() {
    this._tabindex = -1;
    this._changeDetectorRef.markForCheck();
  }
  /** Emits an activation event. Implemented for TreeKeyManagerItem. */
  activate() {
    if (this.isDisabled) {
      return;
    }
    this.activation.next(this._data);
  }
  /** Collapses this data node. Implemented for TreeKeyManagerItem. */
  collapse() {
    if (this.isExpandable) {
      this._tree.collapse(this._data);
    }
  }
  /** Expands this data node. Implemented for TreeKeyManagerItem. */
  expand() {
    if (this.isExpandable) {
      this._tree.expand(this._data);
    }
  }
  /** Makes the node focusable. Implemented for TreeKeyManagerItem. */
  makeFocusable() {
    this._tabindex = 0;
    this._changeDetectorRef.markForCheck();
  }
  _focusItem() {
    if (this.isDisabled) {
      return;
    }
    this._tree._keyManager.focusItem(this);
  }
  _setActiveItem() {
    if (this.isDisabled) {
      return;
    }
    this._shouldFocus = false;
    this._tree._keyManager.focusItem(this);
    this._shouldFocus = true;
  }
  _emitExpansionState(expanded) {
    this.expandedChange.emit(expanded);
  }
  static \u0275fac = function CdkTreeNode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNode)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNode,
    selectors: [["cdk-tree-node"]],
    hostAttrs: ["role", "treeitem", 1, "cdk-tree-node"],
    hostVars: 5,
    hostBindings: function CdkTreeNode_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function CdkTreeNode_click_HostBindingHandler() {
          return ctx._setActiveItem();
        })("focus", function CdkTreeNode_focus_HostBindingHandler() {
          return ctx._focusItem();
        });
      }
      if (rf & 2) {
        \u0275\u0275hostProperty("tabindex", ctx._tabindex);
        \u0275\u0275attribute("aria-expanded", ctx._getAriaExpanded())("aria-level", ctx.level + 1)("aria-posinset", ctx._getPositionInSet())("aria-setsize", ctx._getSetSize());
      }
    },
    inputs: {
      role: "role",
      isExpandable: [2, "isExpandable", "isExpandable", booleanAttribute],
      isExpanded: "isExpanded",
      isDisabled: [2, "isDisabled", "isDisabled", booleanAttribute],
      typeaheadLabel: [0, "cdkTreeNodeTypeaheadLabel", "typeaheadLabel"]
    },
    outputs: {
      activation: "activation",
      expandedChange: "expandedChange"
    },
    exportAs: ["cdkTreeNode"],
    features: [\u0275\u0275InputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNode, [{
    type: Directive,
    args: [{
      selector: "cdk-tree-node",
      exportAs: "cdkTreeNode",
      host: {
        "class": "cdk-tree-node",
        "[attr.aria-expanded]": "_getAriaExpanded()",
        "[attr.aria-level]": "level + 1",
        "[attr.aria-posinset]": "_getPositionInSet()",
        "[attr.aria-setsize]": "_getSetSize()",
        "[tabindex]": "_tabindex",
        "role": "treeitem",
        "(click)": "_setActiveItem()",
        "(focus)": "_focusItem()"
      }
    }]
  }], () => [], {
    role: [{
      type: Input
    }],
    isExpandable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isExpanded: [{
      type: Input
    }],
    isDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    typeaheadLabel: [{
      type: Input,
      args: ["cdkTreeNodeTypeaheadLabel"]
    }],
    activation: [{
      type: Output
    }],
    expandedChange: [{
      type: Output
    }]
  });
})();
function getParentNodeAriaLevel(nodeElement) {
  let parent = nodeElement.parentElement;
  while (parent && !isNodeElement(parent)) {
    parent = parent.parentElement;
  }
  if (!parent) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw Error("Incorrect tree structure containing detached node.");
    } else {
      return -1;
    }
  } else if (parent.classList.contains("cdk-nested-tree-node")) {
    return numberAttribute(parent.getAttribute("aria-level"));
  } else {
    return 0;
  }
}
function isNodeElement(element) {
  const classList = element.classList;
  return !!(classList?.contains("cdk-nested-tree-node") || classList?.contains("cdk-tree"));
}
var CdkNestedTreeNode = class _CdkNestedTreeNode extends CdkTreeNode {
  _type = "nested";
  _differs = inject(IterableDiffers);
  /** Differ used to find the changes in the data provided by the data source. */
  _dataDiffer;
  /** The children data dataNodes of current node. They will be placed in `CdkTreeNodeOutlet`. */
  _children;
  /** The children node placeholder. */
  nodeOutlet;
  constructor() {
    super();
  }
  ngAfterContentInit() {
    this._dataDiffer = this._differs.find([]).create(this._tree.trackBy);
    this._tree._getDirectChildren(this.data).pipe(takeUntil(this._destroyed)).subscribe((result) => this.updateChildrenNodes(result));
    this.nodeOutlet.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this.updateChildrenNodes());
  }
  ngOnDestroy() {
    this._clear();
    super.ngOnDestroy();
  }
  /** Add children dataNodes to the NodeOutlet */
  updateChildrenNodes(children) {
    const outlet = this._getNodeOutlet();
    if (children) {
      this._children = children;
    }
    if (outlet && this._children) {
      const viewContainer = outlet.viewContainer;
      this._tree.renderNodeChanges(this._children, this._dataDiffer, viewContainer, this._data);
    } else {
      this._dataDiffer.diff([]);
    }
  }
  /** Clear the children dataNodes. */
  _clear() {
    const outlet = this._getNodeOutlet();
    if (outlet) {
      outlet.viewContainer.clear();
      this._dataDiffer.diff([]);
    }
  }
  /** Gets the outlet for the current node. */
  _getNodeOutlet() {
    const outlets = this.nodeOutlet;
    return outlets && outlets.find((outlet) => !outlet._node || outlet._node === this);
  }
  static \u0275fac = function CdkNestedTreeNode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkNestedTreeNode)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkNestedTreeNode,
    selectors: [["cdk-nested-tree-node"]],
    contentQueries: function CdkNestedTreeNode_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, CdkTreeNodeOutlet, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nodeOutlet = _t);
      }
    },
    hostAttrs: [1, "cdk-nested-tree-node"],
    exportAs: ["cdkNestedTreeNode"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNode,
      useExisting: _CdkNestedTreeNode
    }, {
      provide: CDK_TREE_NODE_OUTLET_NODE,
      useExisting: _CdkNestedTreeNode
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkNestedTreeNode, [{
    type: Directive,
    args: [{
      selector: "cdk-nested-tree-node",
      exportAs: "cdkNestedTreeNode",
      providers: [{
        provide: CdkTreeNode,
        useExisting: CdkNestedTreeNode
      }, {
        provide: CDK_TREE_NODE_OUTLET_NODE,
        useExisting: CdkNestedTreeNode
      }],
      host: {
        "class": "cdk-nested-tree-node"
      }
    }]
  }], () => [], {
    nodeOutlet: [{
      type: ContentChildren,
      args: [CdkTreeNodeOutlet, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }]
  });
})();
var cssUnitPattern = /([A-Za-z%]+)$/;
var CdkTreeNodePadding = class _CdkTreeNodePadding {
  _treeNode = inject(CdkTreeNode);
  _tree = inject(CdkTree);
  _element = inject(ElementRef);
  _dir = inject(Directionality, {
    optional: true
  });
  /** Current padding value applied to the element. Used to avoid unnecessarily hitting the DOM. */
  _currentPadding;
  /** Subject that emits when the component has been destroyed. */
  _destroyed = new Subject();
  /** CSS units used for the indentation value. */
  indentUnits = "px";
  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  get level() {
    return this._level;
  }
  set level(value) {
    this._setLevelInput(value);
  }
  _level;
  /**
   * The indent for each level. Can be a number or a CSS string.
   * Default number 40px from material design menu sub-menu spec.
   */
  get indent() {
    return this._indent;
  }
  set indent(indent) {
    this._setIndentInput(indent);
  }
  _indent = 40;
  constructor() {
    this._setPadding();
    this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => this._setPadding(true));
    this._treeNode._dataChanges.subscribe(() => this._setPadding());
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
  _paddingIndent() {
    const nodeLevel = (this._treeNode.data && this._tree._getLevel(this._treeNode.data)) ?? null;
    const level = this._level == null ? nodeLevel : this._level;
    return typeof level === "number" ? `${level * this._indent}${this.indentUnits}` : null;
  }
  _setPadding(forceChange = false) {
    const padding = this._paddingIndent();
    if (padding !== this._currentPadding || forceChange) {
      const element = this._element.nativeElement;
      const paddingProp = this._dir && this._dir.value === "rtl" ? "paddingRight" : "paddingLeft";
      const resetProp = paddingProp === "paddingLeft" ? "paddingRight" : "paddingLeft";
      element.style[paddingProp] = padding || "";
      element.style[resetProp] = "";
      this._currentPadding = padding;
    }
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setLevelInput(value) {
    this._level = isNaN(value) ? null : value;
    this._setPadding();
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setIndentInput(indent) {
    let value = indent;
    let units = "px";
    if (typeof indent === "string") {
      const parts = indent.split(cssUnitPattern);
      value = parts[0];
      units = parts[1] || units;
    }
    this.indentUnits = units;
    this._indent = numberAttribute(value);
    this._setPadding();
  }
  static \u0275fac = function CdkTreeNodePadding_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodePadding)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodePadding,
    selectors: [["", "cdkTreeNodePadding", ""]],
    inputs: {
      level: [2, "cdkTreeNodePadding", "level", numberAttribute],
      indent: [0, "cdkTreeNodePaddingIndent", "indent"]
    },
    features: [\u0275\u0275InputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodePadding, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodePadding]"
    }]
  }], () => [], {
    level: [{
      type: Input,
      args: [{
        alias: "cdkTreeNodePadding",
        transform: numberAttribute
      }]
    }],
    indent: [{
      type: Input,
      args: ["cdkTreeNodePaddingIndent"]
    }]
  });
})();
var CdkTreeNodeToggle = class _CdkTreeNodeToggle {
  _tree = inject(CdkTree);
  _treeNode = inject(CdkTreeNode);
  /** Whether expand/collapse the node recursively. */
  recursive = false;
  constructor() {
  }
  // Toggle the expanded or collapsed state of this node.
  //
  // Focus this node with expanding or collapsing it. This ensures that the active node will always
  // be visible when expanding and collapsing.
  _toggle() {
    this.recursive ? this._tree.toggleDescendants(this._treeNode.data) : this._tree.toggle(this._treeNode.data);
    this._tree._keyManager.focusItem(this._treeNode);
  }
  static \u0275fac = function CdkTreeNodeToggle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodeToggle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodeToggle,
    selectors: [["", "cdkTreeNodeToggle", ""]],
    hostAttrs: ["tabindex", "-1"],
    hostBindings: function CdkTreeNodeToggle_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function CdkTreeNodeToggle_click_HostBindingHandler($event) {
          ctx._toggle();
          return $event.stopPropagation();
        })("keydown.Enter", function CdkTreeNodeToggle_keydown_Enter_HostBindingHandler($event) {
          ctx._toggle();
          return $event.preventDefault();
        })("keydown.Space", function CdkTreeNodeToggle_keydown_Space_HostBindingHandler($event) {
          ctx._toggle();
          return $event.preventDefault();
        });
      }
    },
    inputs: {
      recursive: [2, "cdkTreeNodeToggleRecursive", "recursive", booleanAttribute]
    },
    features: [\u0275\u0275InputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodeToggle, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodeToggle]",
      host: {
        "(click)": "_toggle(); $event.stopPropagation();",
        "(keydown.Enter)": "_toggle(); $event.preventDefault();",
        "(keydown.Space)": "_toggle(); $event.preventDefault();",
        "tabindex": "-1"
      }
    }]
  }], () => [], {
    recursive: [{
      type: Input,
      args: [{
        alias: "cdkTreeNodeToggleRecursive",
        transform: booleanAttribute
      }]
    }]
  });
})();
var EXPORTED_DECLARATIONS = [CdkNestedTreeNode, CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTree, CdkTreeNode, CdkTreeNodeOutlet];
var CdkTreeModule = class _CdkTreeModule {
  static \u0275fac = function CdkTreeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkTreeModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeModule, [{
    type: NgModule,
    args: [{
      imports: EXPORTED_DECLARATIONS,
      exports: EXPORTED_DECLARATIONS
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/tree.mjs
function isNoopTreeKeyManager(keyManager) {
  return !!keyManager._isNoopTreeKeyManager;
}
var MatTreeNode = class _MatTreeNode extends CdkTreeNode {
  /**
   * The tabindex of the tree node.
   *
   * @deprecated By default MatTreeNode manages focus using TreeKeyManager instead of tabIndex.
   *   Recommend to avoid setting tabIndex directly to prevent TreeKeyManager form getting into
   *   an unexpected state. Tabindex to be removed in a future version.
   * @breaking-change 21.0.0 Remove this attribute.
   */
  get tabIndexInputBinding() {
    return this._tabIndexInputBinding;
  }
  set tabIndexInputBinding(value) {
    this._tabIndexInputBinding = value;
  }
  _tabIndexInputBinding;
  /**
   * The default tabindex of the tree node.
   *
   * @deprecated By default MatTreeNode manages focus using TreeKeyManager instead of tabIndex.
   *   Recommend to avoid setting tabIndex directly to prevent TreeKeyManager form getting into
   *   an unexpected state. Tabindex to be removed in a future version.
   * @breaking-change 21.0.0 Remove this attribute.
   */
  defaultTabIndex = 0;
  _getTabindexAttribute() {
    if (isNoopTreeKeyManager(this._tree._keyManager)) {
      return this.tabIndexInputBinding;
    }
    return this._tabindex;
  }
  /**
   * Whether the component is disabled.
   *
   * @deprecated This is an alias for `isDisabled`.
   * @breaking-change 21.0.0 Remove this input
   */
  get disabled() {
    return this.isDisabled;
  }
  set disabled(value) {
    this.isDisabled = value;
  }
  constructor() {
    super();
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    this.tabIndexInputBinding = Number(tabIndex) || this.defaultTabIndex;
  }
  // This is a workaround for https://github.com/angular/angular/issues/23091
  // In aot mode, the lifecycle hooks from parent class are not called.
  ngOnInit() {
    super.ngOnInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
  static \u0275fac = function MatTreeNode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTreeNode)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNode,
    selectors: [["mat-tree-node"]],
    hostAttrs: [1, "mat-tree-node"],
    hostVars: 5,
    hostBindings: function MatTreeNode_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatTreeNode_click_HostBindingHandler() {
          return ctx._focusItem();
        });
      }
      if (rf & 2) {
        \u0275\u0275hostProperty("tabindex", ctx._getTabindexAttribute());
        \u0275\u0275attribute("aria-expanded", ctx._getAriaExpanded())("aria-level", ctx.level + 1)("aria-posinset", ctx._getPositionInSet())("aria-setsize", ctx._getSetSize());
      }
    },
    inputs: {
      tabIndexInputBinding: [2, "tabIndex", "tabIndexInputBinding", (value) => value == null ? 0 : numberAttribute(value)],
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      activation: "activation",
      expandedChange: "expandedChange"
    },
    exportAs: ["matTreeNode"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNode,
      useExisting: _MatTreeNode
    }]), \u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNode, [{
    type: Directive,
    args: [{
      selector: "mat-tree-node",
      exportAs: "matTreeNode",
      outputs: ["activation", "expandedChange"],
      providers: [{
        provide: CdkTreeNode,
        useExisting: MatTreeNode
      }],
      host: {
        "class": "mat-tree-node",
        "[attr.aria-expanded]": "_getAriaExpanded()",
        "[attr.aria-level]": "level + 1",
        "[attr.aria-posinset]": "_getPositionInSet()",
        "[attr.aria-setsize]": "_getSetSize()",
        "(click)": "_focusItem()",
        "[tabindex]": "_getTabindexAttribute()"
      }
    }]
  }], () => [], {
    tabIndexInputBinding: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value),
        alias: "tabIndex"
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatTreeNodeDef = class _MatTreeNodeDef extends CdkTreeNodeDef {
  data;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTreeNodeDef_BaseFactory;
    return function MatTreeNodeDef_Factory(__ngFactoryType__) {
      return (\u0275MatTreeNodeDef_BaseFactory || (\u0275MatTreeNodeDef_BaseFactory = \u0275\u0275getInheritedFactory(_MatTreeNodeDef)))(__ngFactoryType__ || _MatTreeNodeDef);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodeDef,
    selectors: [["", "matTreeNodeDef", ""]],
    inputs: {
      when: [0, "matTreeNodeDefWhen", "when"],
      data: [0, "matTreeNode", "data"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodeDef,
      useExisting: _MatTreeNodeDef
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodeDef, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodeDef]",
      inputs: [{
        name: "when",
        alias: "matTreeNodeDefWhen"
      }],
      providers: [{
        provide: CdkTreeNodeDef,
        useExisting: MatTreeNodeDef
      }]
    }]
  }], null, {
    data: [{
      type: Input,
      args: ["matTreeNode"]
    }]
  });
})();
var MatNestedTreeNode = class _MatNestedTreeNode extends CdkNestedTreeNode {
  node;
  /**
   * Whether the node is disabled.
   *
   * @deprecated This is an alias for `isDisabled`.
   * @breaking-change 21.0.0 Remove this input
   */
  get disabled() {
    return this.isDisabled;
  }
  set disabled(value) {
    this.isDisabled = value;
  }
  /** Tabindex of the node. */
  get tabIndex() {
    return this.isDisabled ? -1 : this._tabIndex;
  }
  set tabIndex(value) {
    this._tabIndex = value;
  }
  _tabIndex;
  // This is a workaround for https://github.com/angular/angular/issues/19145
  // In aot mode, the lifecycle hooks from parent class are not called.
  // TODO(tinayuangao): Remove when the angular issue #19145 is fixed
  ngOnInit() {
    super.ngOnInit();
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatNestedTreeNode_BaseFactory;
    return function MatNestedTreeNode_Factory(__ngFactoryType__) {
      return (\u0275MatNestedTreeNode_BaseFactory || (\u0275MatNestedTreeNode_BaseFactory = \u0275\u0275getInheritedFactory(_MatNestedTreeNode)))(__ngFactoryType__ || _MatNestedTreeNode);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatNestedTreeNode,
    selectors: [["mat-nested-tree-node"]],
    hostAttrs: [1, "mat-nested-tree-node"],
    inputs: {
      node: [0, "matNestedTreeNode", "node"],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)]
    },
    outputs: {
      activation: "activation",
      expandedChange: "expandedChange"
    },
    exportAs: ["matNestedTreeNode"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkNestedTreeNode,
      useExisting: _MatNestedTreeNode
    }, {
      provide: CdkTreeNode,
      useExisting: _MatNestedTreeNode
    }, {
      provide: CDK_TREE_NODE_OUTLET_NODE,
      useExisting: _MatNestedTreeNode
    }]), \u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatNestedTreeNode, [{
    type: Directive,
    args: [{
      selector: "mat-nested-tree-node",
      exportAs: "matNestedTreeNode",
      outputs: ["activation", "expandedChange"],
      providers: [{
        provide: CdkNestedTreeNode,
        useExisting: MatNestedTreeNode
      }, {
        provide: CdkTreeNode,
        useExisting: MatNestedTreeNode
      }, {
        provide: CDK_TREE_NODE_OUTLET_NODE,
        useExisting: MatNestedTreeNode
      }],
      host: {
        "class": "mat-nested-tree-node"
      }
    }]
  }], null, {
    node: [{
      type: Input,
      args: ["matNestedTreeNode"]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }]
  });
})();
var MatTreeNodePadding = class _MatTreeNodePadding extends CdkTreeNodePadding {
  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  get level() {
    return this._level;
  }
  set level(value) {
    this._setLevelInput(value);
  }
  /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
  get indent() {
    return this._indent;
  }
  set indent(indent) {
    this._setIndentInput(indent);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTreeNodePadding_BaseFactory;
    return function MatTreeNodePadding_Factory(__ngFactoryType__) {
      return (\u0275MatTreeNodePadding_BaseFactory || (\u0275MatTreeNodePadding_BaseFactory = \u0275\u0275getInheritedFactory(_MatTreeNodePadding)))(__ngFactoryType__ || _MatTreeNodePadding);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodePadding,
    selectors: [["", "matTreeNodePadding", ""]],
    inputs: {
      level: [2, "matTreeNodePadding", "level", numberAttribute],
      indent: [0, "matTreeNodePaddingIndent", "indent"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodePadding,
      useExisting: _MatTreeNodePadding
    }]), \u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodePadding, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodePadding]",
      providers: [{
        provide: CdkTreeNodePadding,
        useExisting: MatTreeNodePadding
      }]
    }]
  }], null, {
    level: [{
      type: Input,
      args: [{
        alias: "matTreeNodePadding",
        transform: numberAttribute
      }]
    }],
    indent: [{
      type: Input,
      args: ["matTreeNodePaddingIndent"]
    }]
  });
})();
var MatTreeNodeOutlet = class _MatTreeNodeOutlet {
  viewContainer = inject(ViewContainerRef);
  _node = inject(CDK_TREE_NODE_OUTLET_NODE, {
    optional: true
  });
  static \u0275fac = function MatTreeNodeOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTreeNodeOutlet)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodeOutlet,
    selectors: [["", "matTreeNodeOutlet", ""]],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodeOutlet,
      useExisting: _MatTreeNodeOutlet
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodeOutlet, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodeOutlet]",
      providers: [{
        provide: CdkTreeNodeOutlet,
        useExisting: MatTreeNodeOutlet
      }]
    }]
  }], null, null);
})();
var MatTree = class _MatTree extends CdkTree {
  // Outlets within the tree's template where the dataNodes will be inserted.
  // We need an initializer here to avoid a TS error. The value will be set in `ngAfterViewInit`.
  _nodeOutlet = void 0;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTree_BaseFactory;
    return function MatTree_Factory(__ngFactoryType__) {
      return (\u0275MatTree_BaseFactory || (\u0275MatTree_BaseFactory = \u0275\u0275getInheritedFactory(_MatTree)))(__ngFactoryType__ || _MatTree);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTree,
    selectors: [["mat-tree"]],
    viewQuery: function MatTree_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatTreeNodeOutlet, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nodeOutlet = _t.first);
      }
    },
    hostAttrs: [1, "mat-tree"],
    exportAs: ["matTree"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTree,
      useExisting: _MatTree
    }]), \u0275\u0275InheritDefinitionFeature],
    decls: 1,
    vars: 0,
    consts: [["matTreeNodeOutlet", ""]],
    template: function MatTree_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0, 0);
      }
    },
    dependencies: [MatTreeNodeOutlet],
    styles: [".mat-tree{display:block;background-color:var(--mat-tree-container-background-color, var(--mat-sys-surface))}.mat-tree-node,.mat-nested-tree-node{color:var(--mat-tree-node-text-color, var(--mat-sys-on-surface));font-family:var(--mat-tree-node-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-tree-node-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-tree-node-text-weight, var(--mat-sys-body-large-weight))}.mat-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word;min-height:var(--mat-tree-node-min-height, 48px)}.mat-nested-tree-node{border-bottom-width:0}"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTree, [{
    type: Component,
    args: [{
      selector: "mat-tree",
      exportAs: "matTree",
      template: `<ng-container matTreeNodeOutlet></ng-container>`,
      host: {
        "class": "mat-tree"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      providers: [{
        provide: CdkTree,
        useExisting: MatTree
      }],
      imports: [MatTreeNodeOutlet],
      styles: [".mat-tree{display:block;background-color:var(--mat-tree-container-background-color, var(--mat-sys-surface))}.mat-tree-node,.mat-nested-tree-node{color:var(--mat-tree-node-text-color, var(--mat-sys-on-surface));font-family:var(--mat-tree-node-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-tree-node-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-tree-node-text-weight, var(--mat-sys-body-large-weight))}.mat-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word;min-height:var(--mat-tree-node-min-height, 48px)}.mat-nested-tree-node{border-bottom-width:0}"]
    }]
  }], null, {
    _nodeOutlet: [{
      type: ViewChild,
      args: [MatTreeNodeOutlet, {
        static: true
      }]
    }]
  });
})();
var MatTreeNodeToggle = class _MatTreeNodeToggle extends CdkTreeNodeToggle {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTreeNodeToggle_BaseFactory;
    return function MatTreeNodeToggle_Factory(__ngFactoryType__) {
      return (\u0275MatTreeNodeToggle_BaseFactory || (\u0275MatTreeNodeToggle_BaseFactory = \u0275\u0275getInheritedFactory(_MatTreeNodeToggle)))(__ngFactoryType__ || _MatTreeNodeToggle);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodeToggle,
    selectors: [["", "matTreeNodeToggle", ""]],
    inputs: {
      recursive: [0, "matTreeNodeToggleRecursive", "recursive"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodeToggle,
      useExisting: _MatTreeNodeToggle
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodeToggle, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodeToggle]",
      providers: [{
        provide: CdkTreeNodeToggle,
        useExisting: MatTreeNodeToggle
      }],
      inputs: [{
        name: "recursive",
        alias: "matTreeNodeToggleRecursive"
      }]
    }]
  }], null, null);
})();
var MAT_TREE_DIRECTIVES = [MatNestedTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle, MatTree, MatTreeNode, MatTreeNodeOutlet];
var MatTreeModule = class _MatTreeModule {
  static \u0275fac = function MatTreeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTreeModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatTreeModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [CdkTreeModule, MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeModule, [{
    type: NgModule,
    args: [{
      imports: [CdkTreeModule, MatCommonModule, ...MAT_TREE_DIRECTIVES],
      exports: [MatCommonModule, MAT_TREE_DIRECTIVES]
    }]
  }], null, null);
})();
var MatTreeFlattener = class {
  transformFunction;
  getLevel;
  isExpandable;
  getChildren;
  constructor(transformFunction, getLevel, isExpandable, getChildren) {
    this.transformFunction = transformFunction;
    this.getLevel = getLevel;
    this.isExpandable = isExpandable;
    this.getChildren = getChildren;
  }
  _flattenNode(node, level, resultNodes, parentMap) {
    const flatNode = this.transformFunction(node, level);
    resultNodes.push(flatNode);
    if (this.isExpandable(flatNode)) {
      const childrenNodes = this.getChildren(node);
      if (childrenNodes) {
        if (Array.isArray(childrenNodes)) {
          this._flattenChildren(childrenNodes, level, resultNodes, parentMap);
        } else {
          childrenNodes.pipe(take(1)).subscribe((children) => {
            this._flattenChildren(children, level, resultNodes, parentMap);
          });
        }
      }
    }
    return resultNodes;
  }
  _flattenChildren(children, level, resultNodes, parentMap) {
    children.forEach((child, index) => {
      let childParentMap = parentMap.slice();
      childParentMap.push(index != children.length - 1);
      this._flattenNode(child, level + 1, resultNodes, childParentMap);
    });
  }
  /**
   * Flatten a list of node type T to flattened version of node F.
   * Please note that type T may be nested, and the length of `structuredData` may be different
   * from that of returned list `F[]`.
   */
  flattenNodes(structuredData) {
    let resultNodes = [];
    structuredData.forEach((node) => this._flattenNode(node, 0, resultNodes, []));
    return resultNodes;
  }
  /**
   * Expand flattened node with current expansion status.
   * The returned list may have different length.
   */
  expandFlattenedNodes(nodes, treeControl) {
    let results = [];
    let currentExpand = [];
    currentExpand[0] = true;
    nodes.forEach((node) => {
      let expand = true;
      for (let i = 0; i <= this.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (this.isExpandable(node)) {
        currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
      }
    });
    return results;
  }
};
var MatTreeFlatDataSource = class extends DataSource {
  _treeControl;
  _treeFlattener;
  _flattenedData = new BehaviorSubject([]);
  _expandedData = new BehaviorSubject([]);
  get data() {
    return this._data.value;
  }
  set data(value) {
    this._data.next(value);
    this._flattenedData.next(this._treeFlattener.flattenNodes(this.data));
    this._treeControl.dataNodes = this._flattenedData.value;
  }
  _data = new BehaviorSubject([]);
  constructor(_treeControl, _treeFlattener, initialData) {
    super();
    this._treeControl = _treeControl;
    this._treeFlattener = _treeFlattener;
    if (initialData) {
      this.data = initialData;
    }
  }
  connect(collectionViewer) {
    return merge(collectionViewer.viewChange, this._treeControl.expansionModel.changed, this._flattenedData).pipe(map(() => {
      this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this._treeControl));
      return this._expandedData.value;
    }));
  }
  disconnect() {
  }
};

// node_modules/@angular/material/fesm2022/divider.mjs
var MatDivider = class _MatDivider {
  /** Whether the divider is vertically aligned. */
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical = false;
  /** Whether the divider is an inset divider. */
  get inset() {
    return this._inset;
  }
  set inset(value) {
    this._inset = coerceBooleanProperty(value);
  }
  _inset = false;
  static \u0275fac = function MatDivider_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDivider)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatDivider,
    selectors: [["mat-divider"]],
    hostAttrs: ["role", "separator", 1, "mat-divider"],
    hostVars: 7,
    hostBindings: function MatDivider_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-orientation", ctx.vertical ? "vertical" : "horizontal");
        \u0275\u0275classProp("mat-divider-vertical", ctx.vertical)("mat-divider-horizontal", !ctx.vertical)("mat-divider-inset", ctx.inset);
      }
    },
    inputs: {
      vertical: "vertical",
      inset: "inset"
    },
    decls: 0,
    vars: 0,
    template: function MatDivider_Template(rf, ctx) {
    },
    styles: [".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-sys-outline));border-top-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-sys-outline));border-right-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDivider, [{
    type: Component,
    args: [{
      selector: "mat-divider",
      host: {
        "role": "separator",
        "[attr.aria-orientation]": 'vertical ? "vertical" : "horizontal"',
        "[class.mat-divider-vertical]": "vertical",
        "[class.mat-divider-horizontal]": "!vertical",
        "[class.mat-divider-inset]": "inset",
        "class": "mat-divider"
      },
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-sys-outline));border-top-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-sys-outline));border-right-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"]
    }]
  }], null, {
    vertical: [{
      type: Input
    }],
    inset: [{
      type: Input
    }]
  });
})();
var MatDividerModule = class _MatDividerModule {
  static \u0275fac = function MatDividerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDividerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatDividerModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDividerModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatDivider],
      exports: [MatDivider, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/list.mjs
var _c0 = ["*"];
var _c1 = '.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mdc-list-list-item-container-color, transparent);border-radius:var(--mdc-list-list-item-container-shape, var(--mat-sys-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height, 48px)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height, 64px)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height, 88px)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-leading-icon-size, 24px);height:var(--mdc-list-list-item-leading-icon-size, 24px);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size, 40px);height:var(--mdc-list-list-item-leading-avatar-size, 40px);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));font-size:var(--mdc-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-trailing-icon-size, 24px);height:var(--mdc-list-list-item-trailing-icon-size, 24px)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mdc-list-list-item-label-text-color, var(--mat-sys-on-surface));font-family:var(--mdc-list-list-item-label-text-font, var(--mat-sys-body-large-font));line-height:var(--mdc-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mdc-list-list-item-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mdc-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));font-family:var(--mdc-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));line-height:var(--mdc-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mdc-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mdc-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));letter-spacing:var(--mdc-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity, 0.38)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity, 0.38)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));background-color:var(--mdc-list-list-item-leading-avatar-color, var(--mat-sys-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mdc-list-list-item-leading-icon-size, 24px)}@media(forced-colors: active){a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none;border-radius:inherit}.mat-mdc-list-item>.mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space, 16px);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space, 16px)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));--mat-focus-indicator-border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container))}';
var _c2 = ["unscopedContent"];
var _c3 = ["text"];
var _c4 = [[["", "matListItemAvatar", ""], ["", "matListItemIcon", ""]], [["", "matListItemTitle", ""]], [["", "matListItemLine", ""]], "*", [["", "matListItemMeta", ""]], [["mat-divider"]]];
var _c5 = ["[matListItemAvatar],[matListItemIcon]", "[matListItemTitle]", "[matListItemLine]", "*", "[matListItemMeta]", "mat-divider"];
var _c6 = [[["", "matListItemTitle", ""]], [["", "matListItemLine", ""]], "*", [["mat-divider"]], [["", "matListItemAvatar", ""], ["", "matListItemIcon", ""]]];
var _c7 = ["[matListItemTitle]", "[matListItemLine]", "*", "mat-divider", "[matListItemAvatar],[matListItemIcon]"];
function MatListOption_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 4);
  }
}
function MatListOption_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "input", 12);
    \u0275\u0275elementStart(2, "div", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 14);
    \u0275\u0275element(4, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(5, "div", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mdc-checkbox--disabled", ctx_r1.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.selected)("disabled", ctx_r1.disabled);
  }
}
function MatListOption_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "input", 18);
    \u0275\u0275elementStart(2, "div", 19);
    \u0275\u0275element(3, "div", 20)(4, "div", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mdc-radio--disabled", ctx_r1.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.selected)("disabled", ctx_r1.disabled);
  }
}
function MatListOption_Conditional_6_ng_template_1_Template(rf, ctx) {
}
function MatListOption_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275template(1, MatListOption_Conditional_6_ng_template_1_Template, 0, 0, "ng-template", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const checkbox_r3 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", checkbox_r3);
  }
}
function MatListOption_Conditional_7_ng_template_1_Template(rf, ctx) {
}
function MatListOption_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275template(1, MatListOption_Conditional_7_ng_template_1_Template, 0, 0, "ng-template", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const radio_r4 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", radio_r4);
  }
}
function MatListOption_Conditional_8_ng_template_0_Template(rf, ctx) {
}
function MatListOption_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatListOption_Conditional_8_ng_template_0_Template, 0, 0, "ng-template", 6);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const icons_r5 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", icons_r5);
  }
}
function MatListOption_Conditional_15_ng_template_1_Template(rf, ctx) {
}
function MatListOption_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275template(1, MatListOption_Conditional_15_ng_template_1_Template, 0, 0, "ng-template", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const checkbox_r3 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", checkbox_r3);
  }
}
function MatListOption_Conditional_16_ng_template_1_Template(rf, ctx) {
}
function MatListOption_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275template(1, MatListOption_Conditional_16_ng_template_1_Template, 0, 0, "ng-template", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const radio_r4 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", radio_r4);
  }
}
function MatListOption_Conditional_17_ng_template_0_Template(rf, ctx) {
}
function MatListOption_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatListOption_Conditional_17_ng_template_0_Template, 0, 0, "ng-template", 6);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const icons_r5 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", icons_r5);
  }
}
var LIST_OPTION = new InjectionToken("ListOption");
var MatListItemTitle = class _MatListItemTitle {
  _elementRef = inject(ElementRef);
  constructor() {
  }
  static \u0275fac = function MatListItemTitle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatListItemTitle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListItemTitle,
    selectors: [["", "matListItemTitle", ""]],
    hostAttrs: [1, "mat-mdc-list-item-title", "mdc-list-item__primary-text"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListItemTitle, [{
    type: Directive,
    args: [{
      selector: "[matListItemTitle]",
      host: {
        "class": "mat-mdc-list-item-title mdc-list-item__primary-text"
      }
    }]
  }], () => [], null);
})();
var MatListItemLine = class _MatListItemLine {
  _elementRef = inject(ElementRef);
  constructor() {
  }
  static \u0275fac = function MatListItemLine_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatListItemLine)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListItemLine,
    selectors: [["", "matListItemLine", ""]],
    hostAttrs: [1, "mat-mdc-list-item-line", "mdc-list-item__secondary-text"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListItemLine, [{
    type: Directive,
    args: [{
      selector: "[matListItemLine]",
      host: {
        "class": "mat-mdc-list-item-line mdc-list-item__secondary-text"
      }
    }]
  }], () => [], null);
})();
var MatListItemMeta = class _MatListItemMeta {
  static \u0275fac = function MatListItemMeta_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatListItemMeta)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListItemMeta,
    selectors: [["", "matListItemMeta", ""]],
    hostAttrs: [1, "mat-mdc-list-item-meta", "mdc-list-item__end"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListItemMeta, [{
    type: Directive,
    args: [{
      selector: "[matListItemMeta]",
      host: {
        "class": "mat-mdc-list-item-meta mdc-list-item__end"
      }
    }]
  }], null, null);
})();
var _MatListItemGraphicBase = class __MatListItemGraphicBase {
  _listOption = inject(LIST_OPTION, {
    optional: true
  });
  constructor() {
  }
  _isAlignedAtStart() {
    return !this._listOption || this._listOption?._getTogglePosition() === "after";
  }
  static \u0275fac = function _MatListItemGraphicBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __MatListItemGraphicBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: __MatListItemGraphicBase,
    hostVars: 4,
    hostBindings: function _MatListItemGraphicBase_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mdc-list-item__start", ctx._isAlignedAtStart())("mdc-list-item__end", !ctx._isAlignedAtStart());
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatListItemGraphicBase, [{
    type: Directive,
    args: [{
      host: {
        // MDC uses intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end` to
        // position content such as icons or checkboxes/radios that comes either before or after the
        // text content respectively. This directive detects the placement of the checkbox/radio and
        // applies the correct MDC class to position the icon/avatar on the opposite side.
        "[class.mdc-list-item__start]": "_isAlignedAtStart()",
        "[class.mdc-list-item__end]": "!_isAlignedAtStart()"
      }
    }]
  }], () => [], null);
})();
var MatListItemAvatar = class _MatListItemAvatar extends _MatListItemGraphicBase {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatListItemAvatar_BaseFactory;
    return function MatListItemAvatar_Factory(__ngFactoryType__) {
      return (\u0275MatListItemAvatar_BaseFactory || (\u0275MatListItemAvatar_BaseFactory = \u0275\u0275getInheritedFactory(_MatListItemAvatar)))(__ngFactoryType__ || _MatListItemAvatar);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListItemAvatar,
    selectors: [["", "matListItemAvatar", ""]],
    hostAttrs: [1, "mat-mdc-list-item-avatar"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListItemAvatar, [{
    type: Directive,
    args: [{
      selector: "[matListItemAvatar]",
      host: {
        "class": "mat-mdc-list-item-avatar"
      }
    }]
  }], null, null);
})();
var MatListItemIcon = class _MatListItemIcon extends _MatListItemGraphicBase {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatListItemIcon_BaseFactory;
    return function MatListItemIcon_Factory(__ngFactoryType__) {
      return (\u0275MatListItemIcon_BaseFactory || (\u0275MatListItemIcon_BaseFactory = \u0275\u0275getInheritedFactory(_MatListItemIcon)))(__ngFactoryType__ || _MatListItemIcon);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListItemIcon,
    selectors: [["", "matListItemIcon", ""]],
    hostAttrs: [1, "mat-mdc-list-item-icon"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListItemIcon, [{
    type: Directive,
    args: [{
      selector: "[matListItemIcon]",
      host: {
        "class": "mat-mdc-list-item-icon"
      }
    }]
  }], null, null);
})();
var MAT_LIST_CONFIG = new InjectionToken("MAT_LIST_CONFIG");
var MatListBase = class _MatListBase {
  _isNonInteractive = true;
  /** Whether ripples for all list items is disabled. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = coerceBooleanProperty(value);
  }
  _disableRipple = false;
  /**
   * Whether the entire list is disabled. When disabled, the list itself and each of its list items
   * are disabled.
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled = false;
  _defaultOptions = inject(MAT_LIST_CONFIG, {
    optional: true
  });
  static \u0275fac = function MatListBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatListBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListBase,
    hostVars: 1,
    hostBindings: function MatListBase_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-disabled", ctx.disabled);
      }
    },
    inputs: {
      disableRipple: "disableRipple",
      disabled: "disabled"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListBase, [{
    type: Directive,
    args: [{
      host: {
        "[attr.aria-disabled]": "disabled"
      }
    }]
  }], null, {
    disableRipple: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }]
  });
})();
var MatListItemBase = class _MatListItemBase {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _listBase = inject(MatListBase, {
    optional: true
  });
  _platform = inject(Platform);
  /** Host element for the list item. */
  _hostElement;
  /** indicate whether the host element is a button or not */
  _isButtonElement;
  /** Whether animations are disabled. */
  _noopAnimations;
  _avatars;
  _icons;
  /**
   * The number of lines this list item should reserve space for. If not specified,
   * lines are inferred based on the projected content.
   *
   * Explicitly specifying the number of lines is useful if you want to acquire additional
   * space and enable the wrapping of text. The unscoped text content of a list item will
   * always be able to take up the remaining space of the item, unless it represents the title.
   *
   * A maximum of three lines is supported as per the Material Design specification.
   */
  set lines(lines) {
    this._explicitLines = coerceNumberProperty(lines, null);
    this._updateItemLines(false);
  }
  _explicitLines = null;
  /** Whether ripples for list items are disabled. */
  get disableRipple() {
    return this.disabled || this._disableRipple || this._noopAnimations || !!this._listBase?.disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = coerceBooleanProperty(value);
  }
  _disableRipple = false;
  /** Whether the list-item is disabled. */
  get disabled() {
    return this._disabled || !!this._listBase?.disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled = false;
  _subscriptions = new Subscription();
  _rippleRenderer = null;
  /** Whether the list item has unscoped text content. */
  _hasUnscopedTextContent = false;
  /**
   * Implemented as part of `RippleTarget`.
   * @docs-private
   */
  rippleConfig;
  /**
   * Implemented as part of `RippleTarget`.
   * @docs-private
   */
  get rippleDisabled() {
    return this.disableRipple || !!this.rippleConfig.disabled;
  }
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const globalRippleOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
      optional: true
    });
    const animationMode = inject(ANIMATION_MODULE_TYPE, {
      optional: true
    });
    this.rippleConfig = globalRippleOptions || {};
    this._hostElement = this._elementRef.nativeElement;
    this._isButtonElement = this._hostElement.nodeName.toLowerCase() === "button";
    this._noopAnimations = animationMode === "NoopAnimations";
    if (this._listBase && !this._listBase._isNonInteractive) {
      this._initInteractiveListItem();
    }
    if (this._isButtonElement && !this._hostElement.hasAttribute("type")) {
      this._hostElement.setAttribute("type", "button");
    }
  }
  ngAfterViewInit() {
    this._monitorProjectedLinesAndTitle();
    this._updateItemLines(true);
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    if (this._rippleRenderer !== null) {
      this._rippleRenderer._removeTriggerEvents();
    }
  }
  /** Whether the list item has icons or avatars. */
  _hasIconOrAvatar() {
    return !!(this._avatars.length || this._icons.length);
  }
  _initInteractiveListItem() {
    this._hostElement.classList.add("mat-mdc-list-item-interactive");
    this._rippleRenderer = new RippleRenderer(this, this._ngZone, this._hostElement, this._platform, inject(Injector));
    this._rippleRenderer.setupTriggerEvents(this._hostElement);
  }
  /**
   * Subscribes to changes in the projected title and lines. Triggers a
   * item lines update whenever a change occurs.
   */
  _monitorProjectedLinesAndTitle() {
    this._ngZone.runOutsideAngular(() => {
      this._subscriptions.add(merge(this._lines.changes, this._titles.changes).subscribe(() => this._updateItemLines(false)));
    });
  }
  /**
   * Updates the lines of the list item. Based on the projected user content and optional
   * explicit lines setting, the visual appearance of the list item is determined.
   *
   * This method should be invoked whenever the projected user content changes, or
   * when the explicit lines have been updated.
   *
   * @param recheckUnscopedContent Whether the projected unscoped content should be re-checked.
   *   The unscoped content is not re-checked for every update as it is a rather expensive check
   *   for content that is expected to not change very often.
   */
  _updateItemLines(recheckUnscopedContent) {
    if (!this._lines || !this._titles || !this._unscopedContent) {
      return;
    }
    if (recheckUnscopedContent) {
      this._checkDomForUnscopedTextContent();
    }
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      sanityCheckListItemContent(this);
    }
    const numberOfLines = this._explicitLines ?? this._inferLinesFromContent();
    const unscopedContentEl = this._unscopedContent.nativeElement;
    this._hostElement.classList.toggle("mat-mdc-list-item-single-line", numberOfLines <= 1);
    this._hostElement.classList.toggle("mdc-list-item--with-one-line", numberOfLines <= 1);
    this._hostElement.classList.toggle("mdc-list-item--with-two-lines", numberOfLines === 2);
    this._hostElement.classList.toggle("mdc-list-item--with-three-lines", numberOfLines === 3);
    if (this._hasUnscopedTextContent) {
      const treatAsTitle = this._titles.length === 0 && numberOfLines === 1;
      unscopedContentEl.classList.toggle("mdc-list-item__primary-text", treatAsTitle);
      unscopedContentEl.classList.toggle("mdc-list-item__secondary-text", !treatAsTitle);
    } else {
      unscopedContentEl.classList.remove("mdc-list-item__primary-text");
      unscopedContentEl.classList.remove("mdc-list-item__secondary-text");
    }
  }
  /**
   * Infers the number of lines based on the projected user content. This is useful
   * if no explicit number of lines has been specified on the list item.
   *
   * The number of lines is inferred based on whether there is a title, the number of
   * additional lines (secondary/tertiary). An additional line is acquired if there is
   * unscoped text content.
   */
  _inferLinesFromContent() {
    let numOfLines = this._titles.length + this._lines.length;
    if (this._hasUnscopedTextContent) {
      numOfLines += 1;
    }
    return numOfLines;
  }
  /** Checks whether the list item has unscoped text content. */
  _checkDomForUnscopedTextContent() {
    this._hasUnscopedTextContent = Array.from(this._unscopedContent.nativeElement.childNodes).filter((node) => node.nodeType !== node.COMMENT_NODE).some((node) => !!(node.textContent && node.textContent.trim()));
  }
  static \u0275fac = function MatListItemBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatListItemBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListItemBase,
    contentQueries: function MatListItemBase_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatListItemAvatar, 4);
        \u0275\u0275contentQuery(dirIndex, MatListItemIcon, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._avatars = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._icons = _t);
      }
    },
    hostVars: 4,
    hostBindings: function MatListItemBase_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-disabled", ctx.disabled)("disabled", ctx._isButtonElement && ctx.disabled || null);
        \u0275\u0275classProp("mdc-list-item--disabled", ctx.disabled);
      }
    },
    inputs: {
      lines: "lines",
      disableRipple: "disableRipple",
      disabled: "disabled"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListItemBase, [{
    type: Directive,
    args: [{
      host: {
        "[class.mdc-list-item--disabled]": "disabled",
        "[attr.aria-disabled]": "disabled",
        "[attr.disabled]": "(_isButtonElement && disabled) || null"
      }
    }]
  }], () => [], {
    _avatars: [{
      type: ContentChildren,
      args: [MatListItemAvatar, {
        descendants: false
      }]
    }],
    _icons: [{
      type: ContentChildren,
      args: [MatListItemIcon, {
        descendants: false
      }]
    }],
    lines: [{
      type: Input
    }],
    disableRipple: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }]
  });
})();
function sanityCheckListItemContent(item) {
  const numTitles = item._titles.length;
  const numLines = item._lines.length;
  if (numTitles > 1) {
    console.warn("A list item cannot have multiple titles.");
  }
  if (numTitles === 0 && numLines > 0) {
    console.warn("A list item line can only be used if there is a list item title.");
  }
  if (numTitles === 0 && item._hasUnscopedTextContent && item._explicitLines !== null && item._explicitLines > 1) {
    console.warn("A list item cannot have wrapping content without a title.");
  }
  if (numLines > 2 || numLines === 2 && item._hasUnscopedTextContent) {
    console.warn("A list item can have at maximum three lines.");
  }
}
var MatActionList = class _MatActionList extends MatListBase {
  // An navigation list is considered interactive, but does not extend the interactive list
  // base class. We do this because as per MDC, items of interactive lists are only reachable
  // through keyboard shortcuts. We want all items for the navigation list to be reachable
  // through tab key as we do not intend to provide any special accessibility treatment. The
  // accessibility treatment depends on how the end-user will interact with it.
  _isNonInteractive = false;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatActionList_BaseFactory;
    return function MatActionList_Factory(__ngFactoryType__) {
      return (\u0275MatActionList_BaseFactory || (\u0275MatActionList_BaseFactory = \u0275\u0275getInheritedFactory(_MatActionList)))(__ngFactoryType__ || _MatActionList);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatActionList,
    selectors: [["mat-action-list"]],
    hostAttrs: ["role", "group", 1, "mat-mdc-action-list", "mat-mdc-list-base", "mdc-list"],
    exportAs: ["matActionList"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MatListBase,
      useExisting: _MatActionList
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MatActionList_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    styles: ['.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mdc-list-list-item-container-color, transparent);border-radius:var(--mdc-list-list-item-container-shape, var(--mat-sys-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height, 48px)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height, 64px)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height, 88px)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-leading-icon-size, 24px);height:var(--mdc-list-list-item-leading-icon-size, 24px);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size, 40px);height:var(--mdc-list-list-item-leading-avatar-size, 40px);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));font-size:var(--mdc-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-trailing-icon-size, 24px);height:var(--mdc-list-list-item-trailing-icon-size, 24px)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mdc-list-list-item-label-text-color, var(--mat-sys-on-surface));font-family:var(--mdc-list-list-item-label-text-font, var(--mat-sys-body-large-font));line-height:var(--mdc-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mdc-list-list-item-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mdc-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));font-family:var(--mdc-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));line-height:var(--mdc-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mdc-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mdc-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));letter-spacing:var(--mdc-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity, 0.38)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity, 0.38)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));background-color:var(--mdc-list-list-item-leading-avatar-color, var(--mat-sys-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mdc-list-list-item-leading-icon-size, 24px)}@media(forced-colors: active){a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none;border-radius:inherit}.mat-mdc-list-item>.mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space, 16px);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space, 16px)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));--mat-focus-indicator-border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container))}'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatActionList, [{
    type: Component,
    args: [{
      selector: "mat-action-list",
      exportAs: "matActionList",
      template: "<ng-content></ng-content>",
      host: {
        "class": "mat-mdc-action-list mat-mdc-list-base mdc-list",
        "role": "group"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatActionList
      }],
      styles: ['.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mdc-list-list-item-container-color, transparent);border-radius:var(--mdc-list-list-item-container-shape, var(--mat-sys-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height, 48px)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height, 64px)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height, 88px)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-leading-icon-size, 24px);height:var(--mdc-list-list-item-leading-icon-size, 24px);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size, 40px);height:var(--mdc-list-list-item-leading-avatar-size, 40px);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));font-size:var(--mdc-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-trailing-icon-size, 24px);height:var(--mdc-list-list-item-trailing-icon-size, 24px)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mdc-list-list-item-label-text-color, var(--mat-sys-on-surface));font-family:var(--mdc-list-list-item-label-text-font, var(--mat-sys-body-large-font));line-height:var(--mdc-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mdc-list-list-item-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mdc-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));font-family:var(--mdc-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));line-height:var(--mdc-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mdc-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mdc-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));letter-spacing:var(--mdc-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity, 0.38)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity, 0.38)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));background-color:var(--mdc-list-list-item-leading-avatar-color, var(--mat-sys-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mdc-list-list-item-leading-icon-size, 24px)}@media(forced-colors: active){a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none;border-radius:inherit}.mat-mdc-list-item>.mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space, 16px);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space, 16px)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));--mat-focus-indicator-border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container))}']
    }]
  }], null, null);
})();
var MAT_LIST = new InjectionToken("MatList");
var MatList = class _MatList extends MatListBase {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatList_BaseFactory;
    return function MatList_Factory(__ngFactoryType__) {
      return (\u0275MatList_BaseFactory || (\u0275MatList_BaseFactory = \u0275\u0275getInheritedFactory(_MatList)))(__ngFactoryType__ || _MatList);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatList,
    selectors: [["mat-list"]],
    hostAttrs: [1, "mat-mdc-list", "mat-mdc-list-base", "mdc-list"],
    exportAs: ["matList"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MatListBase,
      useExisting: _MatList
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MatList_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    styles: [_c1],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatList, [{
    type: Component,
    args: [{
      selector: "mat-list",
      exportAs: "matList",
      template: "<ng-content></ng-content>",
      host: {
        "class": "mat-mdc-list mat-mdc-list-base mdc-list"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatList
      }],
      styles: ['.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mdc-list-list-item-container-color, transparent);border-radius:var(--mdc-list-list-item-container-shape, var(--mat-sys-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height, 48px)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height, 64px)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height, 88px)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-leading-icon-size, 24px);height:var(--mdc-list-list-item-leading-icon-size, 24px);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size, 40px);height:var(--mdc-list-list-item-leading-avatar-size, 40px);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));font-size:var(--mdc-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-trailing-icon-size, 24px);height:var(--mdc-list-list-item-trailing-icon-size, 24px)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mdc-list-list-item-label-text-color, var(--mat-sys-on-surface));font-family:var(--mdc-list-list-item-label-text-font, var(--mat-sys-body-large-font));line-height:var(--mdc-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mdc-list-list-item-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mdc-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));font-family:var(--mdc-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));line-height:var(--mdc-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mdc-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mdc-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));letter-spacing:var(--mdc-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity, 0.38)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity, 0.38)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));background-color:var(--mdc-list-list-item-leading-avatar-color, var(--mat-sys-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mdc-list-list-item-leading-icon-size, 24px)}@media(forced-colors: active){a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none;border-radius:inherit}.mat-mdc-list-item>.mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space, 16px);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space, 16px)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));--mat-focus-indicator-border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container))}']
    }]
  }], null, null);
})();
var MatListItem = class _MatListItem extends MatListItemBase {
  _lines;
  _titles;
  _meta;
  _unscopedContent;
  _itemText;
  /** Indicates whether an item in a `<mat-nav-list>` is the currently active page. */
  get activated() {
    return this._activated;
  }
  set activated(activated) {
    this._activated = coerceBooleanProperty(activated);
  }
  _activated = false;
  /**
   * Determine the value of `aria-current`. Return 'page' if this item is an activated anchor tag.
   * Otherwise, return `null`. This method is safe to use with server-side rendering.
   */
  _getAriaCurrent() {
    return this._hostElement.nodeName === "A" && this._activated ? "page" : null;
  }
  _hasBothLeadingAndTrailing() {
    return this._meta.length !== 0 && (this._avatars.length !== 0 || this._icons.length !== 0);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatListItem_BaseFactory;
    return function MatListItem_Factory(__ngFactoryType__) {
      return (\u0275MatListItem_BaseFactory || (\u0275MatListItem_BaseFactory = \u0275\u0275getInheritedFactory(_MatListItem)))(__ngFactoryType__ || _MatListItem);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatListItem,
    selectors: [["mat-list-item"], ["a", "mat-list-item", ""], ["button", "mat-list-item", ""]],
    contentQueries: function MatListItem_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatListItemLine, 5);
        \u0275\u0275contentQuery(dirIndex, MatListItemTitle, 5);
        \u0275\u0275contentQuery(dirIndex, MatListItemMeta, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lines = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._titles = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._meta = _t);
      }
    },
    viewQuery: function MatListItem_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c2, 5);
        \u0275\u0275viewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._unscopedContent = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._itemText = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-list-item", "mdc-list-item"],
    hostVars: 13,
    hostBindings: function MatListItem_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-current", ctx._getAriaCurrent());
        \u0275\u0275classProp("mdc-list-item--activated", ctx.activated)("mdc-list-item--with-leading-avatar", ctx._avatars.length !== 0)("mdc-list-item--with-leading-icon", ctx._icons.length !== 0)("mdc-list-item--with-trailing-meta", ctx._meta.length !== 0)("mat-mdc-list-item-both-leading-and-trailing", ctx._hasBothLeadingAndTrailing())("_mat-animation-noopable", ctx._noopAnimations);
      }
    },
    inputs: {
      activated: "activated"
    },
    exportAs: ["matListItem"],
    features: [\u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c5,
    decls: 10,
    vars: 0,
    consts: [["unscopedContent", ""], [1, "mdc-list-item__content"], [1, "mat-mdc-list-item-unscoped-content", 3, "cdkObserveContent"], [1, "mat-focus-indicator"]],
    template: function MatListItem_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef(_c4);
        \u0275\u0275projection(0);
        \u0275\u0275elementStart(1, "span", 1);
        \u0275\u0275projection(2, 1);
        \u0275\u0275projection(3, 2);
        \u0275\u0275elementStart(4, "span", 2, 0);
        \u0275\u0275listener("cdkObserveContent", function MatListItem_Template_span_cdkObserveContent_4_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._updateItemLines(true));
        });
        \u0275\u0275projection(6, 3);
        \u0275\u0275elementEnd()();
        \u0275\u0275projection(7, 4);
        \u0275\u0275projection(8, 5);
        \u0275\u0275element(9, "div", 3);
      }
    },
    dependencies: [CdkObserveContent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListItem, [{
    type: Component,
    args: [{
      selector: "mat-list-item, a[mat-list-item], button[mat-list-item]",
      exportAs: "matListItem",
      host: {
        "class": "mat-mdc-list-item mdc-list-item",
        "[class.mdc-list-item--activated]": "activated",
        "[class.mdc-list-item--with-leading-avatar]": "_avatars.length !== 0",
        "[class.mdc-list-item--with-leading-icon]": "_icons.length !== 0",
        "[class.mdc-list-item--with-trailing-meta]": "_meta.length !== 0",
        // Utility class that makes it easier to target the case where there's both a leading
        // and a trailing icon. Avoids having to write out all the combinations.
        "[class.mat-mdc-list-item-both-leading-and-trailing]": "_hasBothLeadingAndTrailing()",
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[attr.aria-current]": "_getAriaCurrent()"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [CdkObserveContent],
      template: '<ng-content select="[matListItemAvatar],[matListItemIcon]"></ng-content>\n\n<span class="mdc-list-item__content">\n  <ng-content select="[matListItemTitle]"></ng-content>\n  <ng-content select="[matListItemLine]"></ng-content>\n  <span #unscopedContent class="mat-mdc-list-item-unscoped-content"\n        (cdkObserveContent)="_updateItemLines(true)">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n<ng-content select="[matListItemMeta]"></ng-content>\n\n<ng-content select="mat-divider"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class="mat-focus-indicator"></div>\n'
    }]
  }], null, {
    _lines: [{
      type: ContentChildren,
      args: [MatListItemLine, {
        descendants: true
      }]
    }],
    _titles: [{
      type: ContentChildren,
      args: [MatListItemTitle, {
        descendants: true
      }]
    }],
    _meta: [{
      type: ContentChildren,
      args: [MatListItemMeta, {
        descendants: true
      }]
    }],
    _unscopedContent: [{
      type: ViewChild,
      args: ["unscopedContent"]
    }],
    _itemText: [{
      type: ViewChild,
      args: ["text"]
    }],
    activated: [{
      type: Input
    }]
  });
})();
var SELECTION_LIST = new InjectionToken("SelectionList");
var MatListOption = class _MatListOption extends MatListItemBase {
  _selectionList = inject(SELECTION_LIST);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _lines;
  _titles;
  _unscopedContent;
  /**
   * Emits when the selected state of the option has changed.
   * Use to facilitate two-data binding to the `selected` property.
   * @docs-private
   */
  selectedChange = new EventEmitter();
  /** Whether the label should appear before or after the checkbox/radio. Defaults to 'after' */
  togglePosition = "after";
  /**
   * Whether the label should appear before or after the checkbox/radio. Defaults to 'after'
   *
   * @deprecated Use `togglePosition` instead.
   * @breaking-change 17.0.0
   */
  get checkboxPosition() {
    return this.togglePosition;
  }
  set checkboxPosition(value) {
    this.togglePosition = value;
  }
  /**
   * Theme color of the list option. This sets the color of the checkbox/radio.
   * This API is supported in M2 themes only, it has no effect in M3 themes. For color customization
   * in M3, see https://material.angular.io/components/list/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get color() {
    return this._color || this._selectionList.color;
  }
  set color(newValue) {
    this._color = newValue;
  }
  _color;
  /** Value of the option */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this.selected && newValue !== this.value && this._inputsInitialized) {
      this.selected = false;
    }
    this._value = newValue;
  }
  _value;
  /** Whether the option is selected. */
  get selected() {
    return this._selectionList.selectedOptions.isSelected(this);
  }
  set selected(value) {
    const isSelected = coerceBooleanProperty(value);
    if (isSelected !== this._selected) {
      this._setSelected(isSelected);
      if (isSelected || this._selectionList.multiple) {
        this._selectionList._reportValueChange();
      }
    }
  }
  _selected = false;
  /**
   * This is set to true after the first OnChanges cycle so we don't
   * clear the value of `selected` in the first cycle.
   */
  _inputsInitialized = false;
  ngOnInit() {
    const list = this._selectionList;
    if (list._value && list._value.some((value) => list.compareWith(this._value, value))) {
      this._setSelected(true);
    }
    const wasSelected = this._selected;
    Promise.resolve().then(() => {
      if (this._selected || wasSelected) {
        this.selected = true;
        this._changeDetectorRef.markForCheck();
      }
    });
    this._inputsInitialized = true;
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.selected) {
      Promise.resolve().then(() => {
        this.selected = false;
      });
    }
  }
  /** Toggles the selection state of the option. */
  toggle() {
    this.selected = !this.selected;
  }
  /** Allows for programmatic focusing of the option. */
  focus() {
    this._hostElement.focus();
  }
  /** Gets the text label of the list option. Used for the typeahead functionality in the list. */
  getLabel() {
    const titleElement = this._titles?.get(0)?._elementRef.nativeElement;
    const labelEl = titleElement || this._unscopedContent?.nativeElement;
    return labelEl?.textContent || "";
  }
  /** Whether a checkbox is shown at the given position. */
  _hasCheckboxAt(position) {
    return this._selectionList.multiple && this._getTogglePosition() === position;
  }
  /** Where a radio indicator is shown at the given position. */
  _hasRadioAt(position) {
    return !this._selectionList.multiple && this._getTogglePosition() === position && !this._selectionList.hideSingleSelectionIndicator;
  }
  /** Whether icons or avatars are shown at the given position. */
  _hasIconsOrAvatarsAt(position) {
    return this._hasProjected("icons", position) || this._hasProjected("avatars", position);
  }
  /** Gets whether the given type of element is projected at the specified position. */
  _hasProjected(type, position) {
    return this._getTogglePosition() !== position && (type === "avatars" ? this._avatars.length !== 0 : this._icons.length !== 0);
  }
  _handleBlur() {
    this._selectionList._onTouched();
  }
  /** Gets the current position of the checkbox/radio. */
  _getTogglePosition() {
    return this.togglePosition || "after";
  }
  /**
   * Sets the selected state of the option.
   * @returns Whether the value has changed.
   */
  _setSelected(selected) {
    if (selected === this._selected) {
      return false;
    }
    this._selected = selected;
    if (selected) {
      this._selectionList.selectedOptions.select(this);
    } else {
      this._selectionList.selectedOptions.deselect(this);
    }
    this.selectedChange.emit(selected);
    this._changeDetectorRef.markForCheck();
    return true;
  }
  /**
   * Notifies Angular that the option needs to be checked in the next change detection run.
   * Mainly used to trigger an update of the list option if the disabled state of the selection
   * list changed.
   */
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  /** Toggles the option's value based on a user interaction. */
  _toggleOnInteraction() {
    if (!this.disabled) {
      if (this._selectionList.multiple) {
        this.selected = !this.selected;
        this._selectionList._emitChangeEvent([this]);
      } else if (!this.selected) {
        this.selected = true;
        this._selectionList._emitChangeEvent([this]);
      }
    }
  }
  /** Sets the tabindex of the list option. */
  _setTabindex(value) {
    this._hostElement.setAttribute("tabindex", value + "");
  }
  _hasBothLeadingAndTrailing() {
    const hasLeading = this._hasProjected("avatars", "before") || this._hasProjected("icons", "before") || this._hasCheckboxAt("before") || this._hasRadioAt("before");
    const hasTrailing = this._hasProjected("icons", "after") || this._hasProjected("avatars", "after") || this._hasCheckboxAt("after") || this._hasRadioAt("after");
    return hasLeading && hasTrailing;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatListOption_BaseFactory;
    return function MatListOption_Factory(__ngFactoryType__) {
      return (\u0275MatListOption_BaseFactory || (\u0275MatListOption_BaseFactory = \u0275\u0275getInheritedFactory(_MatListOption)))(__ngFactoryType__ || _MatListOption);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatListOption,
    selectors: [["mat-list-option"]],
    contentQueries: function MatListOption_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatListItemLine, 5);
        \u0275\u0275contentQuery(dirIndex, MatListItemTitle, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lines = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._titles = _t);
      }
    },
    viewQuery: function MatListOption_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c2, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._unscopedContent = _t.first);
      }
    },
    hostAttrs: ["role", "option", 1, "mat-mdc-list-item", "mat-mdc-list-option", "mdc-list-item"],
    hostVars: 27,
    hostBindings: function MatListOption_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("blur", function MatListOption_blur_HostBindingHandler() {
          return ctx._handleBlur();
        })("click", function MatListOption_click_HostBindingHandler() {
          return ctx._toggleOnInteraction();
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-selected", ctx.selected);
        \u0275\u0275classProp("mdc-list-item--selected", ctx.selected && !ctx._selectionList.multiple && ctx._selectionList.hideSingleSelectionIndicator)("mdc-list-item--with-leading-avatar", ctx._hasProjected("avatars", "before"))("mdc-list-item--with-leading-icon", ctx._hasProjected("icons", "before"))("mdc-list-item--with-trailing-icon", ctx._hasProjected("icons", "after"))("mat-mdc-list-option-with-trailing-avatar", ctx._hasProjected("avatars", "after"))("mdc-list-item--with-leading-checkbox", ctx._hasCheckboxAt("before"))("mdc-list-item--with-trailing-checkbox", ctx._hasCheckboxAt("after"))("mdc-list-item--with-leading-radio", ctx._hasRadioAt("before"))("mdc-list-item--with-trailing-radio", ctx._hasRadioAt("after"))("mat-mdc-list-item-both-leading-and-trailing", ctx._hasBothLeadingAndTrailing())("mat-accent", ctx.color !== "primary" && ctx.color !== "warn")("mat-warn", ctx.color === "warn")("_mat-animation-noopable", ctx._noopAnimations);
      }
    },
    inputs: {
      togglePosition: "togglePosition",
      checkboxPosition: "checkboxPosition",
      color: "color",
      value: "value",
      selected: "selected"
    },
    outputs: {
      selectedChange: "selectedChange"
    },
    exportAs: ["matListOption"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MatListItemBase,
      useExisting: _MatListOption
    }, {
      provide: LIST_OPTION,
      useExisting: _MatListOption
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c7,
    decls: 20,
    vars: 4,
    consts: [["icons", ""], ["checkbox", ""], ["radio", ""], ["unscopedContent", ""], [1, "mdc-list-item__start", "mat-mdc-list-option-checkbox-before"], [1, "mdc-list-item__start", "mat-mdc-list-option-radio-before"], [3, "ngTemplateOutlet"], [1, "mdc-list-item__content"], [1, "mat-mdc-list-item-unscoped-content", 3, "cdkObserveContent"], [1, "mdc-list-item__end"], [1, "mat-focus-indicator"], [1, "mdc-checkbox"], ["type", "checkbox", 1, "mdc-checkbox__native-control", 3, "checked", "disabled"], [1, "mdc-checkbox__background"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-checkbox__checkmark"], ["fill", "none", "d", "M1.73,12.91 8.1,19.28 22.79,4.59", 1, "mdc-checkbox__checkmark-path"], [1, "mdc-checkbox__mixedmark"], [1, "mdc-radio"], ["type", "radio", 1, "mdc-radio__native-control", 3, "checked", "disabled"], [1, "mdc-radio__background"], [1, "mdc-radio__outer-circle"], [1, "mdc-radio__inner-circle"]],
    template: function MatListOption_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef(_c6);
        \u0275\u0275template(0, MatListOption_ng_template_0_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(2, MatListOption_ng_template_2_Template, 6, 4, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(4, MatListOption_ng_template_4_Template, 5, 4, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(6, MatListOption_Conditional_6_Template, 2, 1, "span", 4)(7, MatListOption_Conditional_7_Template, 2, 1, "span", 5)(8, MatListOption_Conditional_8_Template, 1, 1, null, 6);
        \u0275\u0275elementStart(9, "span", 7);
        \u0275\u0275projection(10);
        \u0275\u0275projection(11, 1);
        \u0275\u0275elementStart(12, "span", 8, 3);
        \u0275\u0275listener("cdkObserveContent", function MatListOption_Template_span_cdkObserveContent_12_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._updateItemLines(true));
        });
        \u0275\u0275projection(14, 2);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(15, MatListOption_Conditional_15_Template, 2, 1, "span", 9)(16, MatListOption_Conditional_16_Template, 2, 1, "span", 9)(17, MatListOption_Conditional_17_Template, 1, 1, null, 6);
        \u0275\u0275projection(18, 3);
        \u0275\u0275element(19, "div", 10);
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx._hasCheckboxAt("before") ? 6 : ctx._hasRadioAt("before") ? 7 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx._hasIconsOrAvatarsAt("before") ? 8 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx._hasCheckboxAt("after") ? 15 : ctx._hasRadioAt("after") ? 16 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx._hasIconsOrAvatarsAt("after") ? 17 : -1);
      }
    },
    dependencies: [NgTemplateOutlet, CdkObserveContent],
    styles: ['.mat-mdc-list-option-with-trailing-avatar.mdc-list-item,[dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item{padding-left:0;padding-right:0}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{margin-left:16px;margin-right:16px;width:40px;height:40px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{border-radius:50%}.mat-mdc-list-option .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1;width:var(--mdc-checkbox-state-layer-size, 40px);height:var(--mdc-checkbox-state-layer-size, 40px);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mat-mdc-list-option .mdc-checkbox--disabled{cursor:default;pointer-events:none}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox--disabled{opacity:.5}}.mat-mdc-list-option .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);-webkit-print-color-adjust:exact;color-adjust:exact;border-color:var(--mdc-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2)}.mat-mdc-list-option .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-icon-color, var(--mat-sys-primary));background-color:var(--mdc-checkbox-selected-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-list-option .mdc-checkbox__native-control:disabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:disabled:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));border-color:rgba(0,0,0,0)}.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:not(:checked)~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));background-color:rgba(0,0,0,0)}.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-sys-primary));background-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:not(:checked)~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface))}.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-sys-primary));background-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover>.mdc-checkbox__native-control~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));border-color:rgba(0,0,0,0)}.mat-mdc-list-option .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-sys-on-primary))}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox__checkmark{color:CanvasText}}.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface))}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:CanvasText}}.mat-mdc-list-option .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mat-mdc-list-option .mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);border-color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-sys-on-primary))}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox__mixedmark{margin:0 1px}}.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__mixedmark,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface))}.mat-mdc-list-option .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mat-mdc-list-option .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background>.mdc-checkbox__checkmark{transition:opacity 180ms cubic-bezier(0, 0, 0.2, 1),transform 180ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background>.mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background>.mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background>.mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mat-mdc-list-option .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color;padding:calc((var(--mdc-radio-state-layer-size, 40px) - 20px)/2)}.mat-mdc-list-option .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-list-option .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);width:var(--mdc-radio-state-layer-size, 40px);height:var(--mdc-radio-state-layer-size, 40px);top:calc(-1*(var(--mdc-radio-state-layer-size, 40px) - 20px)/2);left:calc(-1*(var(--mdc-radio-state-layer-size, 40px) - 20px)/2)}.mat-mdc-list-option .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;top:0;right:0;left:0;cursor:inherit;z-index:1;width:var(--mdc-radio-state-layer-size, 40px);height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__outer-circle{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__inner-circle{transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background{cursor:default}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-list-option .mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__inner-circle{transform:scale(0.5);transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-list-option._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-list-option._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mat-mdc-checkbox-touch-target,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__native-control,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__ripple,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mat-mdc-checkbox-ripple::before,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__mixedmark,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mat-mdc-checkbox-touch-target,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__native-control,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__ripple,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mat-mdc-checkbox-ripple::before,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__mixedmark{transition:none !important;animation:none !important}.mat-mdc-list-option .mdc-checkbox__native-control,.mat-mdc-list-option .mdc-radio__native-control{display:none}@media(forced-colors: active){.mat-mdc-list-option.mdc-list-item--selected::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.mat-mdc-list-option.mdc-list-item--selected [dir=rtl]::after{right:auto;left:16px}}'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListOption, [{
    type: Component,
    args: [{
      selector: "mat-list-option",
      exportAs: "matListOption",
      host: {
        "class": "mat-mdc-list-item mat-mdc-list-option mdc-list-item",
        "role": "option",
        // As per MDC, only list items without checkbox or radio indicator should receive the
        // `--selected` class.
        "[class.mdc-list-item--selected]": "selected && !_selectionList.multiple && _selectionList.hideSingleSelectionIndicator",
        // Based on the checkbox/radio position and whether there are icons or avatars, we apply MDC's
        // list-item `--leading` and `--trailing` classes.
        "[class.mdc-list-item--with-leading-avatar]": '_hasProjected("avatars", "before")',
        "[class.mdc-list-item--with-leading-icon]": '_hasProjected("icons", "before")',
        "[class.mdc-list-item--with-trailing-icon]": '_hasProjected("icons", "after")',
        "[class.mat-mdc-list-option-with-trailing-avatar]": '_hasProjected("avatars", "after")',
        // Based on the checkbox/radio position, we apply the `--leading` or `--trailing` MDC classes
        // which ensure that the checkbox/radio is positioned correctly within the list item.
        "[class.mdc-list-item--with-leading-checkbox]": '_hasCheckboxAt("before")',
        "[class.mdc-list-item--with-trailing-checkbox]": '_hasCheckboxAt("after")',
        "[class.mdc-list-item--with-leading-radio]": '_hasRadioAt("before")',
        "[class.mdc-list-item--with-trailing-radio]": '_hasRadioAt("after")',
        // Utility class that makes it easier to target the case where there's both a leading
        // and a trailing icon. Avoids having to write out all the combinations.
        "[class.mat-mdc-list-item-both-leading-and-trailing]": "_hasBothLeadingAndTrailing()",
        "[class.mat-accent]": 'color !== "primary" && color !== "warn"',
        "[class.mat-warn]": 'color === "warn"',
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[attr.aria-selected]": "selected",
        "(blur)": "_handleBlur()",
        "(click)": "_toggleOnInteraction()"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListItemBase,
        useExisting: MatListOption
      }, {
        provide: LIST_OPTION,
        useExisting: MatListOption
      }],
      imports: [NgTemplateOutlet, CdkObserveContent],
      template: `<!--
  Save icons and the pseudo checkbox/radio so that they can be re-used in the template without
  duplication. Also content can only be injected once so we need to extract icons/avatars
  into a template since we use it in multiple places.
-->
<ng-template #icons>
  <ng-content select="[matListItemAvatar],[matListItemIcon]">
  </ng-content>
</ng-template>

<ng-template #checkbox>
  <div class="mdc-checkbox" [class.mdc-checkbox--disabled]="disabled">
    <input type="checkbox" class="mdc-checkbox__native-control"
           [checked]="selected" [disabled]="disabled"/>
    <div class="mdc-checkbox__background">
      <svg class="mdc-checkbox__checkmark"
           viewBox="0 0 24 24"
           aria-hidden="true">
        <path class="mdc-checkbox__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>
      <div class="mdc-checkbox__mixedmark"></div>
    </div>
  </div>
</ng-template>

<ng-template #radio>
  <div class="mdc-radio" [class.mdc-radio--disabled]="disabled">
    <input type="radio" class="mdc-radio__native-control"
           [checked]="selected" [disabled]="disabled"/>
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  </div>
</ng-template>

@if (_hasCheckboxAt('before')) {
  <!-- Container for the checkbox at start. -->
  <span class="mdc-list-item__start mat-mdc-list-option-checkbox-before">
    <ng-template [ngTemplateOutlet]="checkbox"></ng-template>
  </span>
} @else if (_hasRadioAt('before')) {
  <!-- Container for the radio at the start. -->
  <span class="mdc-list-item__start mat-mdc-list-option-radio-before">
    <ng-template [ngTemplateOutlet]="radio"></ng-template>
  </span>
}
<!-- Conditionally renders icons/avatars before the list item text. -->
@if (_hasIconsOrAvatarsAt('before')) {
  <ng-template [ngTemplateOutlet]="icons"></ng-template>
}

<!-- Text -->
<span class="mdc-list-item__content">
  <ng-content select="[matListItemTitle]"></ng-content>
  <ng-content select="[matListItemLine]"></ng-content>
  <span #unscopedContent class="mat-mdc-list-item-unscoped-content"
        (cdkObserveContent)="_updateItemLines(true)">
    <ng-content></ng-content>
  </span>
</span>

@if (_hasCheckboxAt('after')) {
  <!-- Container for the checkbox at the end. -->
  <span class="mdc-list-item__end">
    <ng-template [ngTemplateOutlet]="checkbox"></ng-template>
  </span>
} @else if (_hasRadioAt('after')) {
  <!-- Container for the radio at the end. -->
  <span class="mdc-list-item__end">
    <ng-template [ngTemplateOutlet]="radio"></ng-template>
  </span>
}

<!-- Conditionally renders icons/avatars after the list item text. -->
@if (_hasIconsOrAvatarsAt('after')) {
  <ng-template [ngTemplateOutlet]="icons"></ng-template>
}

<!-- Divider -->
<ng-content select="mat-divider"></ng-content>

<!--
  Strong focus indicator element. MDC uses the \`::before\` pseudo element for the default
  focus/hover/selected state, so we need a separate element.
-->
<div class="mat-focus-indicator"></div>
`,
      styles: ['.mat-mdc-list-option-with-trailing-avatar.mdc-list-item,[dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item{padding-left:0;padding-right:0}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{margin-left:16px;margin-right:16px;width:40px;height:40px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{border-radius:50%}.mat-mdc-list-option .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1;width:var(--mdc-checkbox-state-layer-size, 40px);height:var(--mdc-checkbox-state-layer-size, 40px);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px))/2)}.mat-mdc-list-option .mdc-checkbox--disabled{cursor:default;pointer-events:none}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox--disabled{opacity:.5}}.mat-mdc-list-option .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);-webkit-print-color-adjust:exact;color-adjust:exact;border-color:var(--mdc-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px)/2)}.mat-mdc-list-option .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-icon-color, var(--mat-sys-primary));background-color:var(--mdc-checkbox-selected-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-list-option .mdc-checkbox__native-control:disabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:disabled:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));border-color:rgba(0,0,0,0)}.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:not(:checked)~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));background-color:rgba(0,0,0,0)}.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover>.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-sys-primary));background-color:var(--mdc-checkbox-selected-hover-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:not(:checked)~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface))}.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-sys-primary));background-color:var(--mdc-checkbox-selected-focus-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover>.mdc-checkbox__native-control~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{background-color:var(--mdc-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));border-color:rgba(0,0,0,0)}.mat-mdc-list-option .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-sys-on-primary))}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox__checkmark{color:CanvasText}}.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface))}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark{color:CanvasText}}.mat-mdc-list-option .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mat-mdc-list-option .mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);border-color:var(--mdc-checkbox-selected-checkmark-color, var(--mat-sys-on-primary))}@media(forced-colors: active){.mat-mdc-list-option .mdc-checkbox__mixedmark{margin:0 1px}}.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__mixedmark,.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface))}.mat-mdc-list-option .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mat-mdc-list-option .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;transition:none}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background>.mdc-checkbox__checkmark{transition:opacity 180ms cubic-bezier(0, 0, 0.2, 1),transform 180ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background>.mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background>.mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background>.mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mat-mdc-list-option .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color;padding:calc((var(--mdc-radio-state-layer-size, 40px) - 20px)/2)}.mat-mdc-list-option .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-list-option .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);width:var(--mdc-radio-state-layer-size, 40px);height:var(--mdc-radio-state-layer-size, 40px);top:calc(-1*(var(--mdc-radio-state-layer-size, 40px) - 20px)/2);left:calc(-1*(var(--mdc-radio-state-layer-size, 40px) - 20px)/2)}.mat-mdc-list-option .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 90ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;top:0;right:0;left:0;cursor:inherit;z-index:1;width:var(--mdc-radio-state-layer-size, 40px);height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__outer-circle{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__inner-circle{transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background{cursor:default}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-list-option .mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color, var(--mat-sys-primary))}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__inner-circle{transform:scale(0.5);transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-list-option._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-list-option._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mat-mdc-checkbox-touch-target,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__native-control,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__ripple,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mat-mdc-checkbox-ripple::before,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__start>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__mixedmark,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mat-mdc-checkbox-touch-target,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__native-control,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__ripple,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mat-mdc-checkbox-ripple::before,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__checkmark>.mdc-checkbox__checkmark-path,.mat-mdc-list-option._mat-animation-noopable>.mdc-list-item__end>.mdc-checkbox>.mdc-checkbox__background>.mdc-checkbox__mixedmark{transition:none !important;animation:none !important}.mat-mdc-list-option .mdc-checkbox__native-control,.mat-mdc-list-option .mdc-radio__native-control{display:none}@media(forced-colors: active){.mat-mdc-list-option.mdc-list-item--selected::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.mat-mdc-list-option.mdc-list-item--selected [dir=rtl]::after{right:auto;left:16px}}']
    }]
  }], null, {
    _lines: [{
      type: ContentChildren,
      args: [MatListItemLine, {
        descendants: true
      }]
    }],
    _titles: [{
      type: ContentChildren,
      args: [MatListItemTitle, {
        descendants: true
      }]
    }],
    _unscopedContent: [{
      type: ViewChild,
      args: ["unscopedContent"]
    }],
    selectedChange: [{
      type: Output
    }],
    togglePosition: [{
      type: Input
    }],
    checkboxPosition: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    selected: [{
      type: Input
    }]
  });
})();
var MatListSubheaderCssMatStyler = class _MatListSubheaderCssMatStyler {
  static \u0275fac = function MatListSubheaderCssMatStyler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatListSubheaderCssMatStyler)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatListSubheaderCssMatStyler,
    selectors: [["", "mat-subheader", ""], ["", "matSubheader", ""]],
    hostAttrs: [1, "mat-mdc-subheader", "mdc-list-group__subheader"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListSubheaderCssMatStyler, [{
    type: Directive,
    args: [{
      selector: "[mat-subheader], [matSubheader]",
      // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
      //  make a change in one of the repos to visually distinguish.
      host: {
        "class": "mat-mdc-subheader mdc-list-group__subheader"
      }
    }]
  }], null, null);
})();
var MAT_NAV_LIST = new InjectionToken("MatNavList");
var MatNavList = class _MatNavList extends MatListBase {
  // An navigation list is considered interactive, but does not extend the interactive list
  // base class. We do this because as per MDC, items of interactive lists are only reachable
  // through keyboard shortcuts. We want all items for the navigation list to be reachable
  // through tab key as we do not intend to provide any special accessibility treatment. The
  // accessibility treatment depends on how the end-user will interact with it.
  _isNonInteractive = false;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatNavList_BaseFactory;
    return function MatNavList_Factory(__ngFactoryType__) {
      return (\u0275MatNavList_BaseFactory || (\u0275MatNavList_BaseFactory = \u0275\u0275getInheritedFactory(_MatNavList)))(__ngFactoryType__ || _MatNavList);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatNavList,
    selectors: [["mat-nav-list"]],
    hostAttrs: ["role", "navigation", 1, "mat-mdc-nav-list", "mat-mdc-list-base", "mdc-list"],
    exportAs: ["matNavList"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MatListBase,
      useExisting: _MatNavList
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MatNavList_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    styles: [_c1],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatNavList, [{
    type: Component,
    args: [{
      selector: "mat-nav-list",
      exportAs: "matNavList",
      template: "<ng-content></ng-content>",
      host: {
        "class": "mat-mdc-nav-list mat-mdc-list-base mdc-list",
        "role": "navigation"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatNavList
      }],
      styles: ['.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mdc-list-list-item-container-color, transparent);border-radius:var(--mdc-list-list-item-container-shape, var(--mat-sys-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height, 48px)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height, 64px)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height, 88px)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-leading-icon-size, 24px);height:var(--mdc-list-list-item-leading-icon-size, 24px);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size, 40px);height:var(--mdc-list-list-item-leading-avatar-size, 40px);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));font-size:var(--mdc-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-trailing-icon-size, 24px);height:var(--mdc-list-list-item-trailing-icon-size, 24px)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mdc-list-list-item-label-text-color, var(--mat-sys-on-surface));font-family:var(--mdc-list-list-item-label-text-font, var(--mat-sys-body-large-font));line-height:var(--mdc-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mdc-list-list-item-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mdc-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));font-family:var(--mdc-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));line-height:var(--mdc-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mdc-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mdc-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));letter-spacing:var(--mdc-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity, 0.38)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity, 0.38)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));background-color:var(--mdc-list-list-item-leading-avatar-color, var(--mat-sys-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mdc-list-list-item-leading-icon-size, 24px)}@media(forced-colors: active){a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none;border-radius:inherit}.mat-mdc-list-item>.mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space, 16px);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space, 16px)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));--mat-focus-indicator-border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container))}']
    }]
  }], null, null);
})();
var MAT_SELECTION_LIST_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatSelectionList),
  multi: true
};
var MatSelectionListChange = class {
  source;
  options;
  constructor(source, options) {
    this.source = source;
    this.options = options;
  }
};
var MatSelectionList = class _MatSelectionList extends MatListBase {
  _element = inject(ElementRef);
  _ngZone = inject(NgZone);
  _renderer = inject(Renderer2);
  _initialized = false;
  _keyManager;
  _listenerCleanups;
  /** Emits when the list has been destroyed. */
  _destroyed = new Subject();
  /** Whether the list has been destroyed. */
  _isDestroyed;
  /** View to model callback that should be called whenever the selected options change. */
  _onChange = (_) => {
  };
  _items;
  /** Emits a change event whenever the selected state of an option changes. */
  selectionChange = new EventEmitter();
  /**
   * Theme color of the selection list. This sets the checkbox color for all
   * list options. This API is supported in M2 themes only, it has no effect in
   * M3 themes. For color customization in M3, see https://material.angular.io/components/list/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color = "accent";
  /**
   * Function used for comparing an option against the selected value when determining which
   * options should appear as selected. The first argument is the value of an options. The second
   * one is a value from the selected value. A boolean must be returned.
   */
  compareWith = (a1, a2) => a1 === a2;
  /** Whether selection is limited to one or multiple items (default multiple). */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._multiple) {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && this._initialized) {
        throw new Error("Cannot change `multiple` mode of mat-selection-list after initialization.");
      }
      this._multiple = newValue;
      this.selectedOptions = new SelectionModel(this._multiple, this.selectedOptions.selected);
    }
  }
  _multiple = true;
  /** Whether radio indicator for all list items is hidden. */
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = coerceBooleanProperty(value);
  }
  _hideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
  /** The currently selected options. */
  selectedOptions = new SelectionModel(this._multiple);
  /** Keeps track of the currently-selected value. */
  _value;
  /** View to model callback that should be called if the list or its options lost focus. */
  _onTouched = () => {
  };
  _changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    super();
    this._isNonInteractive = false;
  }
  ngAfterViewInit() {
    this._initialized = true;
    this._setupRovingTabindex();
    this._ngZone.runOutsideAngular(() => {
      this._listenerCleanups = [this._renderer.listen(this._element.nativeElement, "focusin", this._handleFocusin), this._renderer.listen(this._element.nativeElement, "focusout", this._handleFocusout)];
    });
    if (this._value) {
      this._setOptionsFromValues(this._value);
    }
    this._watchForSelectionChange();
  }
  ngOnChanges(changes) {
    const disabledChanges = changes["disabled"];
    const disableRippleChanges = changes["disableRipple"];
    const hideSingleSelectionIndicatorChanges = changes["hideSingleSelectionIndicator"];
    if (disableRippleChanges && !disableRippleChanges.firstChange || disabledChanges && !disabledChanges.firstChange || hideSingleSelectionIndicatorChanges && !hideSingleSelectionIndicatorChanges.firstChange) {
      this._markOptionsForCheck();
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._listenerCleanups?.forEach((current) => current());
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
  }
  /** Focuses the selection list. */
  focus(options) {
    this._element.nativeElement.focus(options);
  }
  /** Selects all of the options. Returns the options that changed as a result. */
  selectAll() {
    return this._setAllOptionsSelected(true);
  }
  /** Deselects all of the options. Returns the options that changed as a result. */
  deselectAll() {
    return this._setAllOptionsSelected(false);
  }
  /** Reports a value change to the ControlValueAccessor */
  _reportValueChange() {
    if (this.options && !this._isDestroyed) {
      const value = this._getSelectedOptionValues();
      this._onChange(value);
      this._value = value;
    }
  }
  /** Emits a change event if the selected state of an option changed. */
  _emitChangeEvent(options) {
    this.selectionChange.emit(new MatSelectionListChange(this, options));
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(values) {
    this._value = values;
    if (this.options) {
      this._setOptionsFromValues(values || []);
    }
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Whether the *entire* selection list is disabled. When true, each list item is also disabled
   * and each list item is removed from the tab order (has tabindex="-1").
   */
  get disabled() {
    return this._selectionListDisabled;
  }
  set disabled(value) {
    this._selectionListDisabled = coerceBooleanProperty(value);
    if (this._selectionListDisabled) {
      this._keyManager?.setActiveItem(-1);
    }
  }
  _selectionListDisabled = false;
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Watches for changes in the selected state of the options and updates the list accordingly. */
  _watchForSelectionChange() {
    this.selectedOptions.changed.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      for (let item of event.added) {
        item.selected = true;
      }
      for (let item of event.removed) {
        item.selected = false;
      }
      if (!this._containsFocus()) {
        this._resetActiveOption();
      }
    });
  }
  /** Sets the selected options based on the specified values. */
  _setOptionsFromValues(values) {
    this.options.forEach((option) => option._setSelected(false));
    values.forEach((value) => {
      const correspondingOption = this.options.find((option) => {
        return option.selected ? false : this.compareWith(option.value, value);
      });
      if (correspondingOption) {
        correspondingOption._setSelected(true);
      }
    });
  }
  /** Returns the values of the selected options. */
  _getSelectedOptionValues() {
    return this.options.filter((option) => option.selected).map((option) => option.value);
  }
  /** Marks all the options to be checked in the next change detection run. */
  _markOptionsForCheck() {
    if (this.options) {
      this.options.forEach((option) => option._markForCheck());
    }
  }
  /**
   * Sets the selected state on all of the options
   * and emits an event if anything changed.
   */
  _setAllOptionsSelected(isSelected, skipDisabled) {
    const changedOptions = [];
    this.options.forEach((option) => {
      if ((!skipDisabled || !option.disabled) && option._setSelected(isSelected)) {
        changedOptions.push(option);
      }
    });
    if (changedOptions.length) {
      this._reportValueChange();
    }
    return changedOptions;
  }
  // Note: This getter exists for backwards compatibility. The `_items` query list
  // cannot be named `options` as it will be picked up by the interactive list base.
  /** The option components contained within this selection-list. */
  get options() {
    return this._items;
  }
  /** Handles keydown events within the list. */
  _handleKeydown(event) {
    const activeItem = this._keyManager.activeItem;
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !this._keyManager.isTyping() && activeItem && !activeItem.disabled) {
      event.preventDefault();
      activeItem._toggleOnInteraction();
    } else if (event.keyCode === A && this.multiple && !this._keyManager.isTyping() && hasModifierKey(event, "ctrlKey", "metaKey")) {
      const shouldSelect = this.options.some((option) => !option.disabled && !option.selected);
      event.preventDefault();
      this._emitChangeEvent(this._setAllOptionsSelected(shouldSelect, true));
    } else {
      this._keyManager.onKeydown(event);
    }
  }
  /** Handles focusout events within the list. */
  _handleFocusout = () => {
    setTimeout(() => {
      if (!this._containsFocus()) {
        this._resetActiveOption();
      }
    });
  };
  /** Handles focusin events within the list. */
  _handleFocusin = (event) => {
    if (this.disabled) {
      return;
    }
    const activeIndex = this._items.toArray().findIndex((item) => item._elementRef.nativeElement.contains(event.target));
    if (activeIndex > -1) {
      this._setActiveOption(activeIndex);
    } else {
      this._resetActiveOption();
    }
  };
  /**
   * Sets up the logic for maintaining the roving tabindex.
   *
   * `skipPredicate` determines if key manager should avoid putting a given list item in the tab
   * index. Allow disabled list items to receive focus to align with WAI ARIA recommendation.
   * Normally WAI ARIA's instructions are to exclude disabled items from the tab order, but it
   * makes a few exceptions for compound widgets.
   *
   * From [Developing a Keyboard Interface](
   * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/):
   *   "For the following composite widget elements, keep them focusable when disabled: Options in a
   *   Listbox..."
   */
  _setupRovingTabindex() {
    this._keyManager = new FocusKeyManager(this._items).withHomeAndEnd().withTypeAhead().withWrap().skipPredicate(() => this.disabled);
    this._resetActiveOption();
    this._keyManager.change.subscribe((activeItemIndex) => this._setActiveOption(activeItemIndex));
    this._items.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      const activeItem = this._keyManager.activeItem;
      if (!activeItem || this._items.toArray().indexOf(activeItem) === -1) {
        this._resetActiveOption();
      }
    });
  }
  /**
   * Sets an option as active.
   * @param index Index of the active option. If set to -1, no option will be active.
   */
  _setActiveOption(index) {
    this._items.forEach((item, itemIndex) => item._setTabindex(itemIndex === index ? 0 : -1));
    this._keyManager.updateActiveItem(index);
  }
  /**
   * Resets the active option. When the list is disabled, remove all options from to the tab order.
   * Otherwise, focus the first selected option.
   */
  _resetActiveOption() {
    if (this.disabled) {
      this._setActiveOption(-1);
      return;
    }
    const activeItem = this._items.find((item) => item.selected && !item.disabled) || this._items.first;
    this._setActiveOption(activeItem ? this._items.toArray().indexOf(activeItem) : -1);
  }
  /** Returns whether the focus is currently within the list. */
  _containsFocus() {
    const activeElement = _getFocusedElementPierceShadowDom();
    return activeElement && this._element.nativeElement.contains(activeElement);
  }
  static \u0275fac = function MatSelectionList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSelectionList)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatSelectionList,
    selectors: [["mat-selection-list"]],
    contentQueries: function MatSelectionList_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatListOption, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._items = _t);
      }
    },
    hostAttrs: ["role", "listbox", 1, "mat-mdc-selection-list", "mat-mdc-list-base", "mdc-list"],
    hostVars: 1,
    hostBindings: function MatSelectionList_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown", function MatSelectionList_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-multiselectable", ctx.multiple);
      }
    },
    inputs: {
      color: "color",
      compareWith: "compareWith",
      multiple: "multiple",
      hideSingleSelectionIndicator: "hideSingleSelectionIndicator",
      disabled: "disabled"
    },
    outputs: {
      selectionChange: "selectionChange"
    },
    exportAs: ["matSelectionList"],
    features: [\u0275\u0275ProvidersFeature([MAT_SELECTION_LIST_VALUE_ACCESSOR, {
      provide: MatListBase,
      useExisting: _MatSelectionList
    }, {
      provide: SELECTION_LIST,
      useExisting: _MatSelectionList
    }]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MatSelectionList_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    styles: [_c1],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSelectionList, [{
    type: Component,
    args: [{
      selector: "mat-selection-list",
      exportAs: "matSelectionList",
      host: {
        "class": "mat-mdc-selection-list mat-mdc-list-base mdc-list",
        "role": "listbox",
        "[attr.aria-multiselectable]": "multiple",
        "(keydown)": "_handleKeydown($event)"
      },
      template: "<ng-content></ng-content>",
      encapsulation: ViewEncapsulation.None,
      providers: [MAT_SELECTION_LIST_VALUE_ACCESSOR, {
        provide: MatListBase,
        useExisting: MatSelectionList
      }, {
        provide: SELECTION_LIST,
        useExisting: MatSelectionList
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: ['.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mdc-list-list-item-container-color, transparent);border-radius:var(--mdc-list-list-item-container-shape, var(--mat-sys-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height, 48px)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height, 64px)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height, 88px)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-leading-icon-size, 24px);height:var(--mdc-list-list-item-leading-icon-size, 24px);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size, 40px);height:var(--mdc-list-list-item-leading-avatar-size, 40px);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));font-size:var(--mdc-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));width:var(--mdc-list-list-item-trailing-icon-size, 24px);height:var(--mdc-list-list-item-trailing-icon-size, 24px)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mdc-list-list-item-label-text-color, var(--mat-sys-on-surface));font-family:var(--mdc-list-list-item-label-text-font, var(--mat-sys-body-large-font));line-height:var(--mdc-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mdc-list-list-item-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mdc-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));font-family:var(--mdc-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));line-height:var(--mdc-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mdc-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mdc-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));letter-spacing:var(--mdc-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity, 0.38)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity, 0.38)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mdc-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));background-color:var(--mdc-list-list-item-leading-avatar-color, var(--mat-sys-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mdc-list-list-item-leading-icon-size, 24px)}@media(forced-colors: active){a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none;border-radius:inherit}.mat-mdc-list-item>.mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space, 16px);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space, 16px)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));--mat-focus-indicator-border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container))}']
    }]
  }], () => [], {
    _items: [{
      type: ContentChildren,
      args: [MatListOption, {
        descendants: true
      }]
    }],
    selectionChange: [{
      type: Output
    }],
    color: [{
      type: Input
    }],
    compareWith: [{
      type: Input
    }],
    multiple: [{
      type: Input
    }],
    hideSingleSelectionIndicator: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }]
  });
})();
var MatListModule = class _MatListModule {
  static \u0275fac = function MatListModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatListModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatListModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [ObserversModule, MatCommonModule, MatRippleModule, MatPseudoCheckboxModule, MatDividerModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatListModule, [{
    type: NgModule,
    args: [{
      imports: [ObserversModule, MatCommonModule, MatRippleModule, MatPseudoCheckboxModule, MatList, MatActionList, MatNavList, MatSelectionList, MatListItem, MatListOption, MatListSubheaderCssMatStyler, MatListItemAvatar, MatListItemIcon, MatListItemLine, MatListItemTitle, MatListItemMeta],
      exports: [MatList, MatActionList, MatNavList, MatSelectionList, MatListItem, MatListOption, MatListItemAvatar, MatListItemIcon, MatListSubheaderCssMatStyler, MatDividerModule, MatListItemLine, MatListItemTitle, MatListItemMeta]
    }]
  }], null, null);
})();

// src/app/shared/common/dialog/deletedialog/deletedialog.component.ts
var DeletedialogComponent = class _DeletedialogComponent {
  dialogRef;
  data;
  Detail = {};
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.Detail = data;
  }
  onClick() {
    this.dialogRef.close({ Detail: this.Detail });
  }
  static \u0275fac = function DeletedialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeletedialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeletedialogComponent, selectors: [["app-deletedialog"]], decls: 13, vars: 1, consts: [[1, "p-4", "flex", "flex-col", "space-y-2"], [1, "font-bold", "text-xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "w-full", "p-4"], [1, "font-bold", "text-red-500"], [1, "relative", "flex", "flex-row", "space-x-2", "justify-center"], [1, "bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", 3, "click"], ["mat-dialog-close", "false", 1, "bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-2", "px-4", "rounded"]], template: function DeletedialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "span", 1);
      \u0275\u0275text(2, "Xo\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "span");
      \u0275\u0275text(5, "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn xo\xE1 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 3);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 4)(9, "button", 5);
      \u0275\u0275listener("click", function DeletedialogComponent_Template_button_click_9_listener() {
        return ctx.onClick();
      });
      \u0275\u0275text(10, " \u0110\u1ED3ng \xFD ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275text(12, " Hu\u1EF7 ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.Detail.Title || ctx.Detail.email);
    }
  }, dependencies: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatDialogClose
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeletedialogComponent, { className: "DeletedialogComponent", filePath: "src/app/shared/common/dialog/deletedialog/deletedialog.component.ts", lineNumber: 20 });
})();

// src/app/shared/common/dialog/updatedialog/updatedialog.component.ts
var _c02 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function UpdatedialogComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 3)(1, "mat-label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function UpdatedialogComponent_For_5_Template_input_ngModelChange_3_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.Detail[item_r2.value], $event) || (ctx_r2.Detail[item_r2.value] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.Title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.Detail[item_r2.value]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c02))("placeholder", item_r2.Title);
  }
}
function UpdatedialogComponent_ForEmpty_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1, "There are no items.");
    \u0275\u0275elementEnd();
  }
}
var UpdatedialogComponent = class _UpdatedialogComponent {
  dialogRef;
  data;
  Detail = {};
  Forms = [];
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.Detail = data.Detail;
    this.Forms = data.Forms;
  }
  FillSlug() {
    this.Detail.Slug = convertToSlug(this.Detail.Title);
  }
  onSaveClick() {
    this.dialogRef.close({ Detail: this.Detail });
  }
  static \u0275fac = function UpdatedialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UpdatedialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UpdatedialogComponent, selectors: [["app-updatedialog"]], decls: 12, vars: 1, consts: [[1, "p-8", "lg:w-[50vw]", "w-[80vw]", "max-h-[90vh]", "flex", "flex-col", "space-y-8"], [1, "relative", "font-bold", "text-xl"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], ["appearance", "outline", 1, "w-full"], [1, "p-2", "text-center"], [1, "relative", "flex", "flex-row", "space-x-2", "justify-center"], [1, "bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", 3, "click"], ["mat-dialog-close", "false", 1, "bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-2", "px-4", "rounded"], ["matInput", "", 3, "ngModelChange", "ngModel", "ngModelOptions", "placeholder"]], template: function UpdatedialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "span", 1);
      \u0275\u0275text(2, "C\u1EADp Nh\u1EADt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275repeaterCreate(4, UpdatedialogComponent_For_5_Template, 4, 5, "mat-form-field", 3, _forTrack0, false, UpdatedialogComponent_ForEmpty_6_Template, 2, 0, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
      \u0275\u0275listener("click", function UpdatedialogComponent_Template_button_click_8_listener() {
        return ctx.onSaveClick();
      });
      \u0275\u0275text(9, " \u0110\u1ED3ng \xDD ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 7);
      \u0275\u0275text(11, " \u0110\xF3ng ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.Forms);
    }
  }, dependencies: [
    CommonModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatInputModule,
    MatInput,
    MatDialogModule,
    MatDialogClose,
    MatSelectModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UpdatedialogComponent, { className: "UpdatedialogComponent", filePath: "src/app/shared/common/dialog/updatedialog/updatedialog.component.ts", lineNumber: 23 });
})();

// src/app/shared/common/treemenu/treemenu.component.ts
function TreemenuComponent_Conditional_0_mat_tree_node_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tree-node")(1, "div", 6)(2, "button", 7)(3, "span", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-menu", null, 0)(9, "button", 10);
    \u0275\u0275listener("click", function TreemenuComponent_Conditional_0_mat_tree_node_1_Template_button_click_9_listener() {
      const node_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.Update(node_r2.Item));
    });
    \u0275\u0275elementStart(10, "div", 11)(11, "span", 12);
    \u0275\u0275text(12, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "S\u1EEDa");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "button", 10);
    \u0275\u0275listener("click", function TreemenuComponent_Conditional_0_mat_tree_node_1_Template_button_click_15_listener() {
      const node_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.Delete(node_r2.Item));
    });
    \u0275\u0275elementStart(16, "div", 11)(17, "span", 13);
    \u0275\u0275text(18, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Xo\xE1");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const node_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(node_r2.Item.icon || "category");
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", node_r2.Item.slug);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(node_r2.Item.title);
  }
}
function TreemenuComponent_Conditional_0_mat_tree_node_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tree-node", 14)(1, "div", 15)(2, "button", 7)(3, "span", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 16);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 17)(8, "span", 18);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-menu", null, 1)(12, "button", 10);
    \u0275\u0275listener("click", function TreemenuComponent_Conditional_0_mat_tree_node_2_Template_button_click_12_listener() {
      const node_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.Update(node_r5.Item));
    });
    \u0275\u0275elementStart(13, "div", 11)(14, "span", 12);
    \u0275\u0275text(15, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "S\u1EEDa");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "button", 10);
    \u0275\u0275listener("click", function TreemenuComponent_Conditional_0_mat_tree_node_2_Template_button_click_18_listener() {
      const node_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.Delete(node_r5.Item));
    });
    \u0275\u0275elementStart(19, "div", 11)(20, "span", 13);
    \u0275\u0275text(21, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "Xo\xE1");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const node_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("cdkTreeNodeTypeaheadLabel", node_r5.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(node_r5.Item.icon || "category");
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", node_r5.Slug);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(node_r5.Item.title);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Toggle " + node_r5.Item.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.treeControl.isExpanded(node_r5) ? "expand_more" : "chevron_right", " ");
  }
}
function TreemenuComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tree", 2);
    \u0275\u0275template(1, TreemenuComponent_Conditional_0_mat_tree_node_1_Template, 21, 3, "mat-tree-node", 4)(2, TreemenuComponent_Conditional_0_mat_tree_node_2_Template, 24, 6, "mat-tree-node", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r2.dataSource)("treeControl", ctx_r2.treeControl);
    \u0275\u0275advance(2);
    \u0275\u0275property("matTreeNodeDefWhen", ctx_r2.hasChild);
  }
}
function TreemenuComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1, "Ch\u01B0a C\xF3 D\u1EEF Li\u1EC7u");
    \u0275\u0275elementEnd();
  }
}
var TreemenuComponent = class _TreemenuComponent {
  ListMenu = [];
  UpdateEmit = new EventEmitter();
  DeleteEmit = new EventEmitter();
  _transformer = (node, level) => {
    return {
      expandable: !!node?.children && node?.children.length > 0,
      Item: node,
      level
    };
  };
  treeControl = new FlatTreeControl((node) => node.level, (node) => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, (node) => node.level, (node) => node.expandable, (node) => node?.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dialog = inject(MatDialog);
  constructor() {
  }
  hasChild = (_, node) => node.expandable;
  ngOnChanges(changes) {
    this.ListMenu = changes["ListMenu"].currentValue;
    this.dataSource.data = this.ListMenu;
    this.treeControl.expandAll();
  }
  Update(item) {
    item.Parent = this.ListMenu;
    const dialogRef = this.dialog.open(UpdatedialogComponent, { data: item });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != "false") {
        this.UpdateEmit.emit(result.Detail);
      }
    });
  }
  Delete(item) {
    const dialogRef = this.dialog.open(DeletedialogComponent, { data: item });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != "false") {
        this.DeleteEmit.emit(result.Detail);
      }
    });
  }
  static \u0275fac = function TreemenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TreemenuComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TreemenuComponent, selectors: [["app-treemenu"]], inputs: { ListMenu: "ListMenu" }, outputs: { UpdateEmit: "UpdateEmit", DeleteEmit: "DeleteEmit" }, features: [\u0275\u0275NgOnChangesFeature], decls: 2, vars: 1, consts: [["menu1", "matMenu"], ["menu2", "matMenu"], [1, "!bg-[#0B9444]", "p-2", 3, "dataSource", "treeControl"], [1, "p-2", "text-center"], [4, "matTreeNodeDef"], ["matTreeNodeToggle", "", 3, "cdkTreeNodeTypeaheadLabel", 4, "matTreeNodeDef", "matTreeNodeDefWhen"], [1, "text-white", "hover:bg-[#0A7A3D]", "rounded-lg", "w-full", "flex", "items-center", "justify-between"], ["mat-icon-button", ""], [1, "material-symbols-outlined"], ["routerLinkActive", "!bg-[#0A7A3D]", 1, "rounded-lg", "p-2", "truncate", "flex-grow", 3, "routerLink"], ["mat-menu-item", "", 3, "click"], [1, "flex", "flex-row", "items-center"], [1, "material-symbols-outlined", "text-blue-500", "mr-2"], [1, "material-symbols-outlined", "text-red-500", "mr-2"], ["matTreeNodeToggle", "", 3, "cdkTreeNodeTypeaheadLabel"], [1, "text-white", "hover:bg-[#0A7A3D]", "ounded-lg", "w-full", "flex", "items-center", "justify-between", "border-b-2"], [1, "rounded-lg", "p-2", "truncate", "flex-grow", 3, "routerLink"], ["mat-icon-button", "", "matTreeNodeToggle", ""], [1, "material-symbols-outlined", "text-white"]], template: function TreemenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, TreemenuComponent_Conditional_0_Template, 3, 3, "mat-tree", 2)(1, TreemenuComponent_Conditional_1_Template, 2, 0, "span", 3);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.ListMenu.length > 0 ? 0 : 1);
    }
  }, dependencies: [MatTreeModule, MatTreeNodeDef, MatTreeNodeToggle, MatTree, MatTreeNode, MatButtonModule, MatIconAnchor, MatIconButton, MatIconModule, CommonModule, RouterLink, MatMenuModule, MatMenu, MatMenuItem, RouterLinkActive], styles: ['\n\nmat-tree-node[aria-level="2"][_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\nmat-tree-node[aria-level="3"][_ngcontent-%COMP%] {\n  padding-left: 40px;\n}\nmat-tree-node[aria-level="4"][_ngcontent-%COMP%] {\n  padding-left: 60px;\n}\n/*# sourceMappingURL=treemenu.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TreemenuComponent, { className: "TreemenuComponent", filePath: "src/app/shared/common/treemenu/treemenu.component.ts", lineNumber: 20 });
})();

// node_modules/@angular/cdk/fesm2022/stepper.mjs
var _c03 = ["*"];
function CdkStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var CdkStepHeader = class _CdkStepHeader {
  _elementRef = inject(ElementRef);
  constructor() {
  }
  /** Focuses the step header. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
  static \u0275fac = function CdkStepHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkStepHeader)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkStepHeader,
    selectors: [["", "cdkStepHeader", ""]],
    hostAttrs: ["role", "tab"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepHeader, [{
    type: Directive,
    args: [{
      selector: "[cdkStepHeader]",
      host: {
        "role": "tab"
      }
    }]
  }], () => [], null);
})();
var CdkStepLabel = class _CdkStepLabel {
  template = inject(TemplateRef);
  constructor() {
  }
  static \u0275fac = function CdkStepLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkStepLabel)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkStepLabel,
    selectors: [["", "cdkStepLabel", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepLabel, [{
    type: Directive,
    args: [{
      selector: "[cdkStepLabel]"
    }]
  }], () => [], null);
})();
var STEP_STATE = {
  NUMBER: "number",
  EDIT: "edit",
  DONE: "done",
  ERROR: "error"
};
var STEPPER_GLOBAL_OPTIONS = new InjectionToken("STEPPER_GLOBAL_OPTIONS");
var CdkStep = class _CdkStep {
  _stepperOptions;
  _stepper = inject(CdkStepper);
  _displayDefaultIndicatorType;
  /** Template for step label if it exists. */
  stepLabel;
  /** Forms that have been projected into the step. */
  _childForms;
  /** Template for step content. */
  content;
  /** The top level abstract control of the step. */
  stepControl;
  /** Whether user has attempted to move away from the step. */
  interacted = false;
  /** Emits when the user has attempted to move away from the step. */
  interactedStream = new EventEmitter();
  /** Plain text label of the step. */
  label;
  /** Error message to display when there's an error. */
  errorMessage;
  /** Aria label for the tab. */
  ariaLabel;
  /**
   * Reference to the element that the tab is labelled by.
   * Will be cleared if `aria-label` is set at the same time.
   */
  ariaLabelledby;
  /** State of the step. */
  state;
  /** Whether the user can return to this step once it has been marked as completed. */
  editable = true;
  /** Whether the completion of step is optional. */
  optional = false;
  /** Whether step is marked as completed. */
  get completed() {
    return this._completedOverride == null ? this._getDefaultCompleted() : this._completedOverride;
  }
  set completed(value) {
    this._completedOverride = value;
  }
  _completedOverride = null;
  _getDefaultCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }
  /** Whether step has an error. */
  get hasError() {
    return this._customError == null ? this._getDefaultError() : this._customError;
  }
  set hasError(value) {
    this._customError = value;
  }
  _customError = null;
  _getDefaultError() {
    return this.stepControl && this.stepControl.invalid && this.interacted;
  }
  constructor() {
    const stepperOptions = inject(STEPPER_GLOBAL_OPTIONS, {
      optional: true
    });
    this._stepperOptions = stepperOptions ? stepperOptions : {};
    this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
  }
  /** Selects this step component. */
  select() {
    this._stepper.selected = this;
  }
  /** Resets the step to its initial state. Note that this includes resetting form data. */
  reset() {
    this.interacted = false;
    if (this._completedOverride != null) {
      this._completedOverride = false;
    }
    if (this._customError != null) {
      this._customError = false;
    }
    if (this.stepControl) {
      this._childForms?.forEach((form) => form.resetForm?.());
      this.stepControl.reset();
    }
  }
  ngOnChanges() {
    this._stepper._stateChanged();
  }
  _markAsInteracted() {
    if (!this.interacted) {
      this.interacted = true;
      this.interactedStream.emit(this);
    }
  }
  /** Determines whether the error state can be shown. */
  _showError() {
    return this._stepperOptions.showError ?? this._customError != null;
  }
  static \u0275fac = function CdkStep_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkStep)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CdkStep,
    selectors: [["cdk-step"]],
    contentQueries: function CdkStep_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, CdkStepLabel, 5);
        \u0275\u0275contentQuery(
          dirIndex,
          // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
          // provides themselves as such, but we don't want to have a concrete reference to both of
          // the directives. The type is marked as `Partial` in case we run into a class that provides
          // itself as `ControlContainer` but doesn't have the same interface as the directives.
          ControlContainer,
          5
        );
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stepLabel = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._childForms = _t);
      }
    },
    viewQuery: function CdkStep_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(TemplateRef, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.content = _t.first);
      }
    },
    inputs: {
      stepControl: "stepControl",
      label: "label",
      errorMessage: "errorMessage",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      state: "state",
      editable: [2, "editable", "editable", booleanAttribute],
      optional: [2, "optional", "optional", booleanAttribute],
      completed: [2, "completed", "completed", booleanAttribute],
      hasError: [2, "hasError", "hasError", booleanAttribute]
    },
    outputs: {
      interactedStream: "interacted"
    },
    exportAs: ["cdkStep"],
    features: [\u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c03,
    decls: 1,
    vars: 0,
    template: function CdkStep_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275template(0, CdkStep_ng_template_0_Template, 1, 0, "ng-template");
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStep, [{
    type: Component,
    args: [{
      selector: "cdk-step",
      exportAs: "cdkStep",
      template: "<ng-template><ng-content/></ng-template>",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [], {
    stepLabel: [{
      type: ContentChild,
      args: [CdkStepLabel]
    }],
    _childForms: [{
      type: ContentChildren,
      args: [
        // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
        // provides themselves as such, but we don't want to have a concrete reference to both of
        // the directives. The type is marked as `Partial` in case we run into a class that provides
        // itself as `ControlContainer` but doesn't have the same interface as the directives.
        ControlContainer,
        {
          descendants: true
        }
      ]
    }],
    content: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    stepControl: [{
      type: Input
    }],
    interactedStream: [{
      type: Output,
      args: ["interacted"]
    }],
    label: [{
      type: Input
    }],
    errorMessage: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    state: [{
      type: Input
    }],
    editable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optional: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    completed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hasError: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkStepper = class _CdkStepper {
  _dir = inject(Directionality, {
    optional: true
  });
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  /** Emits when the component is destroyed. */
  _destroyed = new Subject();
  /** Used for managing keyboard focus. */
  _keyManager;
  /** Full list of steps inside the stepper, including inside nested steppers. */
  _steps;
  /** Steps that belong to the current stepper, excluding ones from nested steppers. */
  steps = new QueryList();
  /** The list of step headers of the steps in the stepper. */
  _stepHeader;
  /** List of step headers sorted based on their DOM order. */
  _sortedHeaders = new QueryList();
  /** Whether the validity of previous steps should be checked or not. */
  linear = false;
  /** The index of the selected step. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index) {
    if (this.steps && this._steps) {
      if (!this._isValidIndex(index) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.");
      }
      this.selected?._markAsInteracted();
      if (this._selectedIndex !== index && !this._anyControlsInvalidOrPending(index) && (index >= this._selectedIndex || this.steps.toArray()[index].editable)) {
        this._updateSelectedItemIndex(index);
      }
    } else {
      this._selectedIndex = index;
    }
  }
  _selectedIndex = 0;
  /** The step that is selected. */
  get selected() {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : void 0;
  }
  set selected(step) {
    this.selectedIndex = step && this.steps ? this.steps.toArray().indexOf(step) : -1;
  }
  /** Event emitted when the selected step has changed. */
  selectionChange = new EventEmitter();
  /** Output to support two-way binding on `[(selectedIndex)]` */
  selectedIndexChange = new EventEmitter();
  /** Used to track unique ID for each stepper component. */
  _groupId = inject(_IdGenerator).getId("cdk-stepper-");
  /** Orientation of the stepper. */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    this._orientation = value;
    if (this._keyManager) {
      this._keyManager.withVerticalOrientation(value === "vertical");
    }
  }
  _orientation = "horizontal";
  constructor() {
  }
  ngAfterContentInit() {
    this._steps.changes.pipe(startWith(this._steps), takeUntil(this._destroyed)).subscribe((steps) => {
      this.steps.reset(steps.filter((step) => step._stepper === this));
      this.steps.notifyOnChanges();
    });
  }
  ngAfterViewInit() {
    this._stepHeader.changes.pipe(startWith(this._stepHeader), takeUntil(this._destroyed)).subscribe((headers) => {
      this._sortedHeaders.reset(headers.toArray().sort((a, b) => {
        const documentPosition = a._elementRef.nativeElement.compareDocumentPosition(b._elementRef.nativeElement);
        return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      }));
      this._sortedHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation === "vertical");
    (this._dir ? this._dir.change : of()).pipe(startWith(this._layoutDirection()), takeUntil(this._destroyed)).subscribe((direction) => this._keyManager.withHorizontalOrientation(direction));
    this._keyManager.updateActiveItem(this._selectedIndex);
    this.steps.changes.subscribe(() => {
      if (!this.selected) {
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
      }
    });
    if (!this._isValidIndex(this._selectedIndex)) {
      this._selectedIndex = 0;
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this.steps.destroy();
    this._sortedHeaders.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Selects and focuses the next step in list. */
  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }
  /** Selects and focuses the previous step in list. */
  previous() {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }
  /** Resets the stepper to its initial state. Note that this includes clearing form data. */
  reset() {
    this._updateSelectedItemIndex(0);
    this.steps.forEach((step) => step.reset());
    this._stateChanged();
  }
  /** Returns a unique id for each step label element. */
  _getStepLabelId(i) {
    return `${this._groupId}-label-${i}`;
  }
  /** Returns unique id for each step content element. */
  _getStepContentId(i) {
    return `${this._groupId}-content-${i}`;
  }
  /** Marks the component to be change detected. */
  _stateChanged() {
    this._changeDetectorRef.markForCheck();
  }
  /** Returns position state of the step with the given index. */
  _getAnimationDirection(index) {
    const position = index - this._selectedIndex;
    if (position < 0) {
      return this._layoutDirection() === "rtl" ? "next" : "previous";
    } else if (position > 0) {
      return this._layoutDirection() === "rtl" ? "previous" : "next";
    }
    return "current";
  }
  /** Returns the type of icon to be displayed. */
  _getIndicatorType(index, state2 = STEP_STATE.NUMBER) {
    const step = this.steps.toArray()[index];
    const isCurrentStep = this._isCurrentStep(index);
    return step._displayDefaultIndicatorType ? this._getDefaultIndicatorLogic(step, isCurrentStep) : this._getGuidelineLogic(step, isCurrentStep, state2);
  }
  _getDefaultIndicatorLogic(step, isCurrentStep) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (!step.completed || isCurrentStep) {
      return STEP_STATE.NUMBER;
    } else {
      return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
    }
  }
  _getGuidelineLogic(step, isCurrentStep, state2 = STEP_STATE.NUMBER) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (step.completed && !isCurrentStep) {
      return STEP_STATE.DONE;
    } else if (step.completed && isCurrentStep) {
      return state2;
    } else if (step.editable && isCurrentStep) {
      return STEP_STATE.EDIT;
    } else {
      return state2;
    }
  }
  _isCurrentStep(index) {
    return this._selectedIndex === index;
  }
  /** Returns the index of the currently-focused step header. */
  _getFocusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
  }
  _updateSelectedItemIndex(newIndex) {
    const stepsArray = this.steps.toArray();
    this.selectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this._selectedIndex,
      selectedStep: stepsArray[newIndex],
      previouslySelectedStep: stepsArray[this._selectedIndex]
    });
    this._containsFocus() ? this._keyManager.setActiveItem(newIndex) : this._keyManager.updateActiveItem(newIndex);
    this._selectedIndex = newIndex;
    this.selectedIndexChange.emit(this._selectedIndex);
    this._stateChanged();
  }
  _onKeydown(event) {
    const hasModifier = hasModifierKey(event);
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    if (manager.activeItemIndex != null && !hasModifier && (keyCode === SPACE || keyCode === ENTER)) {
      this.selectedIndex = manager.activeItemIndex;
      event.preventDefault();
    } else {
      manager.setFocusOrigin("keyboard").onKeydown(event);
    }
  }
  _anyControlsInvalidOrPending(index) {
    if (this.linear && index >= 0) {
      return this.steps.toArray().slice(0, index).some((step) => {
        const control = step.stepControl;
        const isIncomplete = control ? control.invalid || control.pending || !step.interacted : !step.completed;
        return isIncomplete && !step.optional && !step._completedOverride;
      });
    }
    return false;
  }
  _layoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Checks whether the stepper contains the focused element. */
  _containsFocus() {
    const stepperElement = this._elementRef.nativeElement;
    const focusedElement = _getFocusedElementPierceShadowDom();
    return stepperElement === focusedElement || stepperElement.contains(focusedElement);
  }
  /** Checks whether the passed-in index is a valid step index. */
  _isValidIndex(index) {
    return index > -1 && (!this.steps || index < this.steps.length);
  }
  static \u0275fac = function CdkStepper_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkStepper)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkStepper,
    selectors: [["", "cdkStepper", ""]],
    contentQueries: function CdkStepper_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, CdkStep, 5);
        \u0275\u0275contentQuery(dirIndex, CdkStepHeader, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._steps = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._stepHeader = _t);
      }
    },
    inputs: {
      linear: [2, "linear", "linear", booleanAttribute],
      selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute],
      selected: "selected",
      orientation: "orientation"
    },
    outputs: {
      selectionChange: "selectionChange",
      selectedIndexChange: "selectedIndexChange"
    },
    exportAs: ["cdkStepper"],
    features: [\u0275\u0275InputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepper, [{
    type: Directive,
    args: [{
      selector: "[cdkStepper]",
      exportAs: "cdkStepper"
    }]
  }], () => [], {
    _steps: [{
      type: ContentChildren,
      args: [CdkStep, {
        descendants: true
      }]
    }],
    _stepHeader: [{
      type: ContentChildren,
      args: [CdkStepHeader, {
        descendants: true
      }]
    }],
    linear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    selected: [{
      type: Input
    }],
    selectionChange: [{
      type: Output
    }],
    selectedIndexChange: [{
      type: Output
    }],
    orientation: [{
      type: Input
    }]
  });
})();
var CdkStepperNext = class _CdkStepperNext {
  _stepper = inject(CdkStepper);
  /** Type of the next button. Defaults to "submit" if not specified. */
  type = "submit";
  constructor() {
  }
  static \u0275fac = function CdkStepperNext_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkStepperNext)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkStepperNext,
    selectors: [["button", "cdkStepperNext", ""]],
    hostVars: 1,
    hostBindings: function CdkStepperNext_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function CdkStepperNext_click_HostBindingHandler() {
          return ctx._stepper.next();
        });
      }
      if (rf & 2) {
        \u0275\u0275hostProperty("type", ctx.type);
      }
    },
    inputs: {
      type: "type"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperNext, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperNext]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.next()"
      }
    }]
  }], () => [], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperPrevious = class _CdkStepperPrevious {
  _stepper = inject(CdkStepper);
  /** Type of the previous button. Defaults to "button" if not specified. */
  type = "button";
  constructor() {
  }
  static \u0275fac = function CdkStepperPrevious_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkStepperPrevious)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkStepperPrevious,
    selectors: [["button", "cdkStepperPrevious", ""]],
    hostVars: 1,
    hostBindings: function CdkStepperPrevious_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function CdkStepperPrevious_click_HostBindingHandler() {
          return ctx._stepper.previous();
        });
      }
      if (rf & 2) {
        \u0275\u0275hostProperty("type", ctx.type);
      }
    },
    inputs: {
      type: "type"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperPrevious, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperPrevious]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.previous()"
      }
    }]
  }], () => [], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperModule = class _CdkStepperModule {
  static \u0275fac = function CdkStepperModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkStepperModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkStepperModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
      exports: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/stepper.mjs
function MatStepHeader_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.iconOverrides[ctx_r0.state])("ngTemplateOutletContext", ctx_r0._getIconContext());
  }
}
function MatStepHeader_Conditional_4_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.completedLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.editableLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatStepHeader_Conditional_4_Case_1_Conditional_0_Template, 2, 1, "span", 8)(1, MatStepHeader_Conditional_4_Case_1_Conditional_1_Template, 2, 1, "span", 8);
    \u0275\u0275elementStart(2, "mat-icon", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.state === "done" ? 0 : ctx_r0.state === "edit" ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatStepHeader_Conditional_4_Case_0_Template, 2, 1, "span", 7)(1, MatStepHeader_Conditional_4_Case_1_Template, 4, 2);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.state) === "number" ? 0 : 1);
  }
}
function MatStepHeader_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275elementContainer(1, 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx.template);
  }
}
function MatStepHeader_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
function MatStepHeader_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.optionalLabel);
  }
}
function MatStepHeader_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
var _c04 = ["*"];
function MatStep_ng_template_0_ng_template_1_Template(rf, ctx) {
}
function MatStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
    \u0275\u0275template(1, MatStep_ng_template_0_ng_template_1_Template, 0, 0, "ng-template", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("cdkPortalOutlet", ctx_r0._portal);
  }
}
var _c12 = (a0, a1) => ({
  step: a0,
  i: a1
});
var _c22 = (a0) => ({
  "animationDuration": a0
});
var _c32 = (a0, a1) => ({
  "value": a0,
  "params": a1
});
function MatStepper_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function MatStepper_Case_1_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function MatStepper_Case_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 5);
    \u0275\u0275template(1, MatStepper_Case_1_For_3_Conditional_1_Template, 1, 0, "div", 6);
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const \u0275$index_8_r2 = ctx.$index;
    const \u0275$count_8_r3 = ctx.$count;
    \u0275\u0275nextContext(2);
    const stepTemplate_r4 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", stepTemplate_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(3, _c12, step_r1, \u0275$index_8_r2));
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_8_r2 === \u0275$count_8_r3 - 1) ? 1 : -1);
  }
}
function MatStepper_Case_1_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275listener("@horizontalStepTransition.done", function MatStepper_Case_1_For_6_Template_div_animation_horizontalStepTransition_done_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5._animationDone.next($event));
    });
    \u0275\u0275elementContainer(1, 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r7 = ctx.$implicit;
    const \u0275$index_16_r8 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("mat-horizontal-stepper-content-inactive", ctx_r5.selectedIndex !== \u0275$index_16_r8);
    \u0275\u0275property("@horizontalStepTransition", \u0275\u0275pureFunction2(8, _c32, ctx_r5._getAnimationDirection(\u0275$index_16_r8), \u0275\u0275pureFunction1(6, _c22, ctx_r5._getAnimationDuration())))("id", ctx_r5._getStepContentId(\u0275$index_16_r8));
    \u0275\u0275attribute("aria-labelledby", ctx_r5._getStepLabelId(\u0275$index_16_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", step_r7.content);
  }
}
function MatStepper_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275repeaterCreate(2, MatStepper_Case_1_For_3_Template, 2, 6, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 3);
    \u0275\u0275repeaterCreate(5, MatStepper_Case_1_For_6_Template, 2, 11, "div", 4, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r5.steps);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r5.steps);
  }
}
function MatStepper_Case_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275elementContainer(1, 5);
    \u0275\u0275elementStart(2, "div", 10)(3, "div", 11);
    \u0275\u0275listener("@verticalStepTransition.done", function MatStepper_Case_2_For_1_Template_div_animation_verticalStepTransition_done_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5._animationDone.next($event));
    });
    \u0275\u0275elementStart(4, "div", 12);
    \u0275\u0275elementContainer(5, 8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const step_r10 = ctx.$implicit;
    const \u0275$index_22_r11 = ctx.$index;
    const \u0275$count_22_r12 = ctx.$count;
    const ctx_r5 = \u0275\u0275nextContext(2);
    const stepTemplate_r4 = \u0275\u0275reference(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stepTemplate_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(10, _c12, step_r10, \u0275$index_22_r11));
    \u0275\u0275advance();
    \u0275\u0275classProp("mat-stepper-vertical-line", !(\u0275$index_22_r11 === \u0275$count_22_r12 - 1));
    \u0275\u0275advance();
    \u0275\u0275classProp("mat-vertical-stepper-content-inactive", ctx_r5.selectedIndex !== \u0275$index_22_r11);
    \u0275\u0275property("@verticalStepTransition", \u0275\u0275pureFunction2(15, _c32, ctx_r5._getAnimationDirection(\u0275$index_22_r11), \u0275\u0275pureFunction1(13, _c22, ctx_r5._getAnimationDuration())))("id", ctx_r5._getStepContentId(\u0275$index_22_r11));
    \u0275\u0275attribute("aria-labelledby", ctx_r5._getStepLabelId(\u0275$index_22_r11));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", step_r10.content);
  }
}
function MatStepper_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MatStepper_Case_2_For_1_Template, 6, 18, "div", 9, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r5.steps);
  }
}
function MatStepper_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-step-header", 13);
    \u0275\u0275listener("click", function MatStepper_ng_template_3_Template_mat_step_header_click_0_listener() {
      const step_r14 = \u0275\u0275restoreView(_r13).step;
      return \u0275\u0275resetView(step_r14.select());
    })("keydown", function MatStepper_ng_template_3_Template_mat_step_header_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._onKeydown($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r14 = ctx.step;
    const i_r15 = ctx.i;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mat-horizontal-stepper-header", ctx_r5.orientation === "horizontal")("mat-vertical-stepper-header", ctx_r5.orientation === "vertical");
    \u0275\u0275property("tabIndex", ctx_r5._getFocusIndex() === i_r15 ? 0 : -1)("id", ctx_r5._getStepLabelId(i_r15))("index", i_r15)("state", ctx_r5._getIndicatorType(i_r15, step_r14.state))("label", step_r14.stepLabel || step_r14.label)("selected", ctx_r5.selectedIndex === i_r15)("active", ctx_r5._stepIsNavigable(i_r15, step_r14))("optional", step_r14.optional)("errorMessage", step_r14.errorMessage)("iconOverrides", ctx_r5._iconOverrides)("disableRipple", ctx_r5.disableRipple || !ctx_r5._stepIsNavigable(i_r15, step_r14))("color", step_r14.color || ctx_r5.color);
    \u0275\u0275attribute("aria-posinset", i_r15 + 1)("aria-setsize", ctx_r5.steps.length)("aria-controls", ctx_r5._getStepContentId(i_r15))("aria-selected", ctx_r5.selectedIndex == i_r15)("aria-label", step_r14.ariaLabel || null)("aria-labelledby", !step_r14.ariaLabel && step_r14.ariaLabelledby ? step_r14.ariaLabelledby : null)("aria-disabled", ctx_r5._stepIsNavigable(i_r15, step_r14) ? null : true);
  }
}
var MatStepLabel = class _MatStepLabel extends CdkStepLabel {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatStepLabel_BaseFactory;
    return function MatStepLabel_Factory(__ngFactoryType__) {
      return (\u0275MatStepLabel_BaseFactory || (\u0275MatStepLabel_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepLabel)))(__ngFactoryType__ || _MatStepLabel);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatStepLabel,
    selectors: [["", "matStepLabel", ""]],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepLabel, [{
    type: Directive,
    args: [{
      selector: "[matStepLabel]"
    }]
  }], null, null);
})();
var MatStepperIntl = class _MatStepperIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  changes = new Subject();
  /** Label that is rendered below optional steps. */
  optionalLabel = "Optional";
  /** Label that is used to indicate step as completed to screen readers. */
  completedLabel = "Completed";
  /** Label that is used to indicate step as editable to screen readers. */
  editableLabel = "Editable";
  static \u0275fac = function MatStepperIntl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatStepperIntl)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatStepperIntl,
    factory: _MatStepperIntl.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function MAT_STEPPER_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new MatStepperIntl();
}
var MAT_STEPPER_INTL_PROVIDER = {
  provide: MatStepperIntl,
  deps: [[new Optional(), new SkipSelf(), MatStepperIntl]],
  useFactory: MAT_STEPPER_INTL_PROVIDER_FACTORY
};
var MatStepHeader = class _MatStepHeader extends CdkStepHeader {
  _intl = inject(MatStepperIntl);
  _focusMonitor = inject(FocusMonitor);
  _intlSubscription;
  /** State of the given step. */
  state;
  /** Label of the given step. */
  label;
  /** Error message to display when there's an error. */
  errorMessage;
  /** Overrides for the header icons, passed in via the stepper. */
  iconOverrides;
  /** Index of the given step. */
  index;
  /** Whether the given step is selected. */
  selected;
  /** Whether the given step label is active. */
  active;
  /** Whether the given step is optional. */
  optional;
  /** Whether the ripple should be disabled. */
  disableRipple;
  /**
   * Theme color of the step header. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.io/components/stepper/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  constructor() {
    super();
    const styleLoader = inject(_CdkPrivateStyleLoader);
    styleLoader.load(_StructuralStylesLoader);
    styleLoader.load(_VisuallyHiddenLoader);
    const changeDetectorRef = inject(ChangeDetectorRef);
    this._intlSubscription = this._intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Focuses the step header. */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  /** Returns string label of given step if it is a text label. */
  _stringLabel() {
    return this.label instanceof MatStepLabel ? null : this.label;
  }
  /** Returns MatStepLabel if the label of given step is a template label. */
  _templateLabel() {
    return this.label instanceof MatStepLabel ? this.label : null;
  }
  /** Returns the host HTML element. */
  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  /** Template context variables that are exposed to the `matStepperIcon` instances. */
  _getIconContext() {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional
    };
  }
  _getDefaultTextForState(state2) {
    if (state2 == "number") {
      return `${this.index + 1}`;
    }
    if (state2 == "edit") {
      return "create";
    }
    if (state2 == "error") {
      return "warning";
    }
    return state2;
  }
  static \u0275fac = function MatStepHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatStepHeader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatStepHeader,
    selectors: [["mat-step-header"]],
    hostAttrs: ["role", "tab", 1, "mat-step-header"],
    hostVars: 2,
    hostBindings: function MatStepHeader_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap("mat-" + (ctx.color || "primary"));
      }
    },
    inputs: {
      state: "state",
      label: "label",
      errorMessage: "errorMessage",
      iconOverrides: "iconOverrides",
      index: "index",
      selected: "selected",
      active: "active",
      optional: "optional",
      disableRipple: "disableRipple",
      color: "color"
    },
    features: [\u0275\u0275InheritDefinitionFeature],
    decls: 10,
    vars: 17,
    consts: [["matRipple", "", 1, "mat-step-header-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mat-step-icon-content"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-step-label"], [1, "mat-step-text-label"], [1, "mat-step-optional"], [1, "mat-step-sub-label-error"], ["aria-hidden", "true"], [1, "cdk-visually-hidden"], [3, "ngTemplateOutlet"]],
    template: function MatStepHeader_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "div", 0);
        \u0275\u0275elementStart(1, "div")(2, "div", 1);
        \u0275\u0275template(3, MatStepHeader_Conditional_3_Template, 1, 2, "ng-container", 2)(4, MatStepHeader_Conditional_4_Template, 2, 1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "div", 3);
        \u0275\u0275template(6, MatStepHeader_Conditional_6_Template, 2, 1, "div", 4)(7, MatStepHeader_Conditional_7_Template, 2, 1, "div", 4)(8, MatStepHeader_Conditional_8_Template, 2, 1, "div", 5)(9, MatStepHeader_Conditional_9_Template, 2, 1, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_8_0;
        \u0275\u0275property("matRippleTrigger", ctx._getHostElement())("matRippleDisabled", ctx.disableRipple);
        \u0275\u0275advance();
        \u0275\u0275classMapInterpolate1("mat-step-icon-state-", ctx.state, " mat-step-icon");
        \u0275\u0275classProp("mat-step-icon-selected", ctx.selected);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.iconOverrides && ctx.iconOverrides[ctx.state] ? 3 : 4);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("mat-step-label-active", ctx.active)("mat-step-label-selected", ctx.selected)("mat-step-label-error", ctx.state == "error");
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_8_0 = ctx._templateLabel()) ? 6 : ctx._stringLabel() ? 7 : -1, tmp_8_0);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.optional && ctx.state != "error" ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.state === "error" ? 9 : -1);
      }
    },
    dependencies: [MatRipple, NgTemplateOutlet, MatIcon],
    styles: ['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-inverse-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));border-radius:var(--mat-stepper-header-hover-state-layer-shape, var(--mat-sys-corner-medium))}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-inverse-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));border-radius:var(--mat-stepper-header-focus-state-layer-shape, var(--mat-sys-corner-medium))}@media(hover: none){.mat-step-header:hover{background:none}}@media(forced-colors: active){.mat-step-header{outline:solid 1px}.mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.mat-step-header[aria-disabled=true]{outline-color:GrayText}.mat-step-header[aria-disabled=true] .mat-step-label,.mat-step-header[aria-disabled=true] .mat-step-icon,.mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color, var(--mat-sys-surface));background-color:var(--mat-stepper-header-icon-background-color, var(--mat-sys-on-surface-variant))}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color, transparent);color:var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-sys-error))}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font, var(--mat-sys-title-small-font));font-size:var(--mat-stepper-header-label-text-size, var(--mat-sys-title-small-size));font-weight:var(--mat-stepper-header-label-text-weight, var(--mat-sys-title-small-weight));color:var(--mat-stepper-header-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color, var(--mat-sys-error));font-size:var(--mat-stepper-header-error-state-label-text-size, var(--mat-sys-title-small-size))}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size, var(--mat-sys-title-small-size));font-weight:var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-sys-title-small-weight))}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-sys-primary));color:var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-sys-on-primary))}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-sys-primary));color:var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-sys-on-primary))}'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepHeader, [{
    type: Component,
    args: [{
      selector: "mat-step-header",
      host: {
        "class": "mat-step-header",
        "[class]": '"mat-" + (color || "primary")',
        "role": "tab"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [MatRipple, NgTemplateOutlet, MatIcon],
      template: `<div class="mat-step-header-ripple mat-focus-indicator" matRipple
     [matRippleTrigger]="_getHostElement()"
     [matRippleDisabled]="disableRipple"></div>

<div class="mat-step-icon-state-{{state}} mat-step-icon" [class.mat-step-icon-selected]="selected">
  <div class="mat-step-icon-content">
    @if (iconOverrides && iconOverrides[state]) {
      <ng-container
        [ngTemplateOutlet]="iconOverrides[state]"
        [ngTemplateOutletContext]="_getIconContext()"></ng-container>
    } @else {
      @switch (state) {
        @case ('number') {
          <span aria-hidden="true">{{_getDefaultTextForState(state)}}</span>
        }

        @default {
          @if (state === 'done') {
            <span class="cdk-visually-hidden">{{_intl.completedLabel}}</span>
          } @else if (state === 'edit') {
            <span class="cdk-visually-hidden">{{_intl.editableLabel}}</span>
          }

          <mat-icon aria-hidden="true">{{_getDefaultTextForState(state)}}</mat-icon>
        }
      }
    }
  </div>
</div>
<div class="mat-step-label"
     [class.mat-step-label-active]="active"
     [class.mat-step-label-selected]="selected"
     [class.mat-step-label-error]="state == 'error'">
  @if (_templateLabel(); as templateLabel) {
    <!-- If there is a label template, use it. -->
    <div class="mat-step-text-label">
      <ng-container [ngTemplateOutlet]="templateLabel.template"></ng-container>
    </div>
  } @else if (_stringLabel()) {
    <!-- If there is no label template, fall back to the text label. -->
    <div class="mat-step-text-label">{{label}}</div>
  }

  @if (optional && state != 'error') {
    <div class="mat-step-optional">{{_intl.optionalLabel}}</div>
  }

  @if (state === 'error') {
    <div class="mat-step-sub-label-error">{{errorMessage}}</div>
  }
</div>

`,
      styles: ['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-inverse-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));border-radius:var(--mat-stepper-header-hover-state-layer-shape, var(--mat-sys-corner-medium))}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-inverse-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));border-radius:var(--mat-stepper-header-focus-state-layer-shape, var(--mat-sys-corner-medium))}@media(hover: none){.mat-step-header:hover{background:none}}@media(forced-colors: active){.mat-step-header{outline:solid 1px}.mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.mat-step-header[aria-disabled=true]{outline-color:GrayText}.mat-step-header[aria-disabled=true] .mat-step-label,.mat-step-header[aria-disabled=true] .mat-step-icon,.mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color, var(--mat-sys-surface));background-color:var(--mat-stepper-header-icon-background-color, var(--mat-sys-on-surface-variant))}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color, transparent);color:var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-sys-error))}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font, var(--mat-sys-title-small-font));font-size:var(--mat-stepper-header-label-text-size, var(--mat-sys-title-small-size));font-weight:var(--mat-stepper-header-label-text-weight, var(--mat-sys-title-small-weight));color:var(--mat-stepper-header-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color, var(--mat-sys-error));font-size:var(--mat-stepper-header-error-state-label-text-size, var(--mat-sys-title-small-size))}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size, var(--mat-sys-title-small-size));font-weight:var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-sys-title-small-weight))}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-sys-primary));color:var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-sys-on-primary))}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-sys-primary));color:var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-sys-on-primary))}']
    }]
  }], () => [], {
    state: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    errorMessage: [{
      type: Input
    }],
    iconOverrides: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    active: [{
      type: Input
    }],
    optional: [{
      type: Input
    }],
    disableRipple: [{
      type: Input
    }],
    color: [{
      type: Input
    }]
  });
})();
var DEFAULT_HORIZONTAL_ANIMATION_DURATION = "500ms";
var DEFAULT_VERTICAL_ANIMATION_DURATION = "225ms";
var matStepperAnimations = {
  /** Animation that transitions the step along the X axis in a horizontal stepper. */
  horizontalStepTransition: trigger("horizontalStepTransition", [
    state("previous", style({
      transform: "translate3d(-100%, 0, 0)",
      visibility: "hidden"
    })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state("current", style({
      transform: "none",
      visibility: "inherit"
    })),
    state("next", style({
      transform: "translate3d(100%, 0, 0)",
      visibility: "hidden"
    })),
    transition("* => *", group([animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)"), query("@*", animateChild(), {
      optional: true
    })]), {
      params: {
        "animationDuration": DEFAULT_HORIZONTAL_ANIMATION_DURATION
      }
    })
  ]),
  /** Animation that transitions the step along the Y axis in a vertical stepper. */
  verticalStepTransition: trigger("verticalStepTransition", [
    state("previous", style({
      height: "0px",
      visibility: "hidden"
    })),
    state("next", style({
      height: "0px",
      visibility: "hidden"
    })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state("current", style({
      height: "*",
      visibility: "inherit"
    })),
    transition("* <=> current", group([animate("{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)"), query("@*", animateChild(), {
      optional: true
    })]), {
      params: {
        "animationDuration": DEFAULT_VERTICAL_ANIMATION_DURATION
      }
    })
  ])
};
var MatStepperIcon = class _MatStepperIcon {
  templateRef = inject(TemplateRef);
  /** Name of the icon to be overridden. */
  name;
  constructor() {
  }
  static \u0275fac = function MatStepperIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatStepperIcon)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatStepperIcon,
    selectors: [["ng-template", "matStepperIcon", ""]],
    inputs: {
      name: [0, "matStepperIcon", "name"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperIcon, [{
    type: Directive,
    args: [{
      selector: "ng-template[matStepperIcon]"
    }]
  }], () => [], {
    name: [{
      type: Input,
      args: ["matStepperIcon"]
    }]
  });
})();
var MatStepContent = class _MatStepContent {
  _template = inject(TemplateRef);
  constructor() {
  }
  static \u0275fac = function MatStepContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatStepContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatStepContent,
    selectors: [["ng-template", "matStepContent", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepContent, [{
    type: Directive,
    args: [{
      selector: "ng-template[matStepContent]"
    }]
  }], () => [], null);
})();
var MatStep = class _MatStep extends CdkStep {
  _errorStateMatcher = inject(ErrorStateMatcher, {
    skipSelf: true
  });
  _viewContainerRef = inject(ViewContainerRef);
  _isSelected = Subscription.EMPTY;
  /** Content for step label given by `<ng-template matStepLabel>`. */
  // We need an initializer here to avoid a TS error.
  stepLabel = void 0;
  /**
   * Theme color for the particular step. This API is supported in M2 themes
   * only, it has no effect in M3 themes. For color customization in M3, see https://material.angular.io/components/stepper/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  /** Content that will be rendered lazily. */
  _lazyContent;
  /** Currently-attached portal containing the lazy content. */
  _portal;
  ngAfterContentInit() {
    this._isSelected = this._stepper.steps.changes.pipe(switchMap(() => {
      return this._stepper.selectionChange.pipe(map((event) => event.selectedStep === this), startWith(this._stepper.selected === this));
    })).subscribe((isSelected) => {
      if (isSelected && this._lazyContent && !this._portal) {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      }
    });
  }
  ngOnDestroy() {
    this._isSelected.unsubscribe();
  }
  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control, form) {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatStep_BaseFactory;
    return function MatStep_Factory(__ngFactoryType__) {
      return (\u0275MatStep_BaseFactory || (\u0275MatStep_BaseFactory = \u0275\u0275getInheritedFactory(_MatStep)))(__ngFactoryType__ || _MatStep);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatStep,
    selectors: [["mat-step"]],
    contentQueries: function MatStep_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatStepLabel, 5);
        \u0275\u0275contentQuery(dirIndex, MatStepContent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stepLabel = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lazyContent = _t.first);
      }
    },
    hostAttrs: ["hidden", ""],
    inputs: {
      color: "color"
    },
    exportAs: ["matStep"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: ErrorStateMatcher,
      useExisting: _MatStep
    }, {
      provide: CdkStep,
      useExisting: _MatStep
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c04,
    decls: 1,
    vars: 0,
    consts: [[3, "cdkPortalOutlet"]],
    template: function MatStep_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275template(0, MatStep_ng_template_0_Template, 2, 1, "ng-template");
      }
    },
    dependencies: [CdkPortalOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStep, [{
    type: Component,
    args: [{
      selector: "mat-step",
      providers: [{
        provide: ErrorStateMatcher,
        useExisting: MatStep
      }, {
        provide: CdkStep,
        useExisting: MatStep
      }],
      encapsulation: ViewEncapsulation.None,
      exportAs: "matStep",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [CdkPortalOutlet],
      host: {
        "hidden": ""
        // Hide the steps so they don't affect the layout.
      },
      template: '<ng-template>\n  <ng-content></ng-content>\n  <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n</ng-template>\n'
    }]
  }], null, {
    stepLabel: [{
      type: ContentChild,
      args: [MatStepLabel]
    }],
    color: [{
      type: Input
    }],
    _lazyContent: [{
      type: ContentChild,
      args: [MatStepContent, {
        static: false
      }]
    }]
  });
})();
var MatStepper = class _MatStepper extends CdkStepper {
  /** The list of step headers of the steps in the stepper. */
  // We need an initializer here to avoid a TS error.
  _stepHeader = void 0;
  /** Full list of steps inside the stepper, including inside nested steppers. */
  // We need an initializer here to avoid a TS error.
  _steps = void 0;
  /** Steps that belong to the current stepper, excluding ones from nested steppers. */
  steps = new QueryList();
  /** Custom icon overrides passed in by the consumer. */
  _icons;
  /** Event emitted when the current step is done transitioning in. */
  animationDone = new EventEmitter();
  /** Whether ripples should be disabled for the step headers. */
  disableRipple;
  /**
   * Theme color for all of the steps in stepper. This API is supported in M2
   * themes only, it has no effect in M3 themes. For color customization in M3, see https://material.angular.io/components/stepper/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  /**
   * Whether the label should display in bottom or end position.
   * Only applies in the `horizontal` orientation.
   */
  labelPosition = "end";
  /**
   * Position of the stepper's header.
   * Only applies in the `horizontal` orientation.
   */
  headerPosition = "top";
  /** Consumer-specified template-refs to be used to override the header icons. */
  _iconOverrides = {};
  /** Stream of animation `done` events when the body expands/collapses. */
  _animationDone = new Subject();
  /** Duration for the animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value) ? value + "ms" : value;
  }
  _animationDuration = "";
  /** Whether the stepper is rendering on the server. */
  _isServer = !inject(Platform).isBrowser;
  constructor() {
    super();
    const elementRef = inject(ElementRef);
    const nodeName = elementRef.nativeElement.nodeName.toLowerCase();
    this.orientation = nodeName === "mat-vertical-stepper" ? "vertical" : "horizontal";
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._icons.forEach(({
      name,
      templateRef
    }) => this._iconOverrides[name] = templateRef);
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
    this._animationDone.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (event.toState === "current") {
        this.animationDone.emit();
      }
    });
  }
  _stepIsNavigable(index, step) {
    return step.completed || this.selectedIndex === index || !this.linear;
  }
  _getAnimationDuration() {
    if (this.animationDuration) {
      return this.animationDuration;
    }
    return this.orientation === "horizontal" ? DEFAULT_HORIZONTAL_ANIMATION_DURATION : DEFAULT_VERTICAL_ANIMATION_DURATION;
  }
  static \u0275fac = function MatStepper_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatStepper)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatStepper,
    selectors: [["mat-stepper"], ["mat-vertical-stepper"], ["mat-horizontal-stepper"], ["", "matStepper", ""]],
    contentQueries: function MatStepper_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatStep, 5);
        \u0275\u0275contentQuery(dirIndex, MatStepperIcon, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._steps = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._icons = _t);
      }
    },
    viewQuery: function MatStepper_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatStepHeader, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._stepHeader = _t);
      }
    },
    hostAttrs: ["role", "tablist"],
    hostVars: 11,
    hostBindings: function MatStepper_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-orientation", ctx.orientation);
        \u0275\u0275classProp("mat-stepper-horizontal", ctx.orientation === "horizontal")("mat-stepper-vertical", ctx.orientation === "vertical")("mat-stepper-label-position-end", ctx.orientation === "horizontal" && ctx.labelPosition == "end")("mat-stepper-label-position-bottom", ctx.orientation === "horizontal" && ctx.labelPosition == "bottom")("mat-stepper-header-position-bottom", ctx.headerPosition === "bottom");
      }
    },
    inputs: {
      disableRipple: "disableRipple",
      color: "color",
      labelPosition: "labelPosition",
      headerPosition: "headerPosition",
      animationDuration: "animationDuration"
    },
    outputs: {
      animationDone: "animationDone"
    },
    exportAs: ["matStepper", "matVerticalStepper", "matHorizontalStepper"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkStepper,
      useExisting: _MatStepper
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c04,
    decls: 5,
    vars: 2,
    consts: [["stepTemplate", ""], [1, "mat-horizontal-stepper-wrapper"], [1, "mat-horizontal-stepper-header-container"], [1, "mat-horizontal-content-container"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id", "mat-horizontal-stepper-content-inactive"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-stepper-horizontal-line"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id"], [3, "ngTemplateOutlet"], [1, "mat-step"], [1, "mat-vertical-content-container"], ["role", "tabpanel", 1, "mat-vertical-stepper-content", 3, "id"], [1, "mat-vertical-content"], [3, "click", "keydown", "tabIndex", "id", "index", "state", "label", "selected", "active", "optional", "errorMessage", "iconOverrides", "disableRipple", "color"]],
    template: function MatStepper_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275template(0, MatStepper_Conditional_0_Template, 1, 0)(1, MatStepper_Case_1_Template, 7, 0, "div", 1)(2, MatStepper_Case_2_Template, 2, 0)(3, MatStepper_ng_template_3_Template, 1, 23, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275conditional(ctx._isServer ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_2_0 = ctx.orientation) === "horizontal" ? 1 : tmp_2_0 === "vertical" ? 2 : -1);
      }
    },
    dependencies: [NgTemplateOutlet, MatStepHeader],
    styles: ['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font, var(--mat-sys-body-medium-font));background:var(--mat-stepper-container-color, var(--mat-sys-surface))}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color, var(--mat-sys-outline))}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height, 72px)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color, var(--mat-sys-outline))}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}@media(forced-colors: active){.mat-horizontal-content-container{outline:solid 1px}}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}@media(forced-colors: active){.mat-vertical-content-container{outline:solid 1px}}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color, var(--mat-sys-outline));top:calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}'],
    encapsulation: 2,
    data: {
      animation: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepper, [{
    type: Component,
    args: [{
      selector: "mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]",
      exportAs: "matStepper, matVerticalStepper, matHorizontalStepper",
      host: {
        "[class.mat-stepper-horizontal]": 'orientation === "horizontal"',
        "[class.mat-stepper-vertical]": 'orientation === "vertical"',
        "[class.mat-stepper-label-position-end]": 'orientation === "horizontal" && labelPosition == "end"',
        "[class.mat-stepper-label-position-bottom]": 'orientation === "horizontal" && labelPosition == "bottom"',
        "[class.mat-stepper-header-position-bottom]": 'headerPosition === "bottom"',
        "[attr.aria-orientation]": "orientation",
        "role": "tablist"
      },
      animations: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition],
      providers: [{
        provide: CdkStepper,
        useExisting: MatStepper
      }],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgTemplateOutlet, MatStepHeader],
      template: `<!--
  We need to project the content somewhere to avoid hydration errors. Some observations:
  1. This is only necessary on the server.
  2. We get a hydration error if there aren't any nodes after the \`ng-content\`.
  3. We get a hydration error if \`ng-content\` is wrapped in another element.
-->
@if (_isServer) {
  <ng-content/>
}

@switch (orientation) {
  @case ('horizontal') {
    <div class="mat-horizontal-stepper-wrapper">
      <div class="mat-horizontal-stepper-header-container">
        @for (step of steps; track step; let i = $index, isLast = $last) {
          <ng-container
            [ngTemplateOutlet]="stepTemplate"
            [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>
          @if (!isLast) {
            <div class="mat-stepper-horizontal-line"></div>
          }
        }
      </div>

      <div class="mat-horizontal-content-container">
        @for (step of steps; track step; let i = $index) {
          <div class="mat-horizontal-stepper-content" role="tabpanel"
               [@horizontalStepTransition]="{
                  'value': _getAnimationDirection(i),
                  'params': {'animationDuration': _getAnimationDuration()}
                }"
               (@horizontalStepTransition.done)="_animationDone.next($event)"
               [id]="_getStepContentId(i)"
               [attr.aria-labelledby]="_getStepLabelId(i)"
               [class.mat-horizontal-stepper-content-inactive]="selectedIndex !== i">
            <ng-container [ngTemplateOutlet]="step.content"></ng-container>
          </div>
        }
      </div>
    </div>
  }

  @case ('vertical') {
    @for (step of steps; track step; let i = $index, isLast = $last) {
      <div class="mat-step">
        <ng-container
          [ngTemplateOutlet]="stepTemplate"
          [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>
        <div class="mat-vertical-content-container" [class.mat-stepper-vertical-line]="!isLast">
          <div class="mat-vertical-stepper-content" role="tabpanel"
               [@verticalStepTransition]="{
                  'value': _getAnimationDirection(i),
                  'params': {'animationDuration': _getAnimationDuration()}
                }"
               (@verticalStepTransition.done)="_animationDone.next($event)"
               [id]="_getStepContentId(i)"
               [attr.aria-labelledby]="_getStepLabelId(i)"
               [class.mat-vertical-stepper-content-inactive]="selectedIndex !== i">
            <div class="mat-vertical-content">
              <ng-container [ngTemplateOutlet]="step.content"></ng-container>
            </div>
          </div>
        </div>
      </div>
    }
  }
}

<!-- Common step templating -->
<ng-template let-step="step" let-i="i" #stepTemplate>
  <mat-step-header
    [class.mat-horizontal-stepper-header]="orientation === 'horizontal'"
    [class.mat-vertical-stepper-header]="orientation === 'vertical'"
    (click)="step.select()"
    (keydown)="_onKeydown($event)"
    [tabIndex]="_getFocusIndex() === i ? 0 : -1"
    [id]="_getStepLabelId(i)"
    [attr.aria-posinset]="i + 1"
    [attr.aria-setsize]="steps.length"
    [attr.aria-controls]="_getStepContentId(i)"
    [attr.aria-selected]="selectedIndex == i"
    [attr.aria-label]="step.ariaLabel || null"
    [attr.aria-labelledby]="(!step.ariaLabel && step.ariaLabelledby) ? step.ariaLabelledby : null"
    [attr.aria-disabled]="_stepIsNavigable(i, step) ? null : true"
    [index]="i"
    [state]="_getIndicatorType(i, step.state)"
    [label]="step.stepLabel || step.label"
    [selected]="selectedIndex === i"
    [active]="_stepIsNavigable(i, step)"
    [optional]="step.optional"
    [errorMessage]="step.errorMessage"
    [iconOverrides]="_iconOverrides"
    [disableRipple]="disableRipple || !_stepIsNavigable(i, step)"
    [color]="step.color || color"></mat-step-header>
</ng-template>
`,
      styles: ['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font, var(--mat-sys-body-medium-font));background:var(--mat-stepper-container-color, var(--mat-sys-surface))}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color, var(--mat-sys-outline))}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height, 72px)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color, var(--mat-sys-outline))}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}@media(forced-colors: active){.mat-horizontal-content-container{outline:solid 1px}}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}@media(forced-colors: active){.mat-vertical-content-container{outline:solid 1px}}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color, var(--mat-sys-outline));top:calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}']
    }]
  }], () => [], {
    _stepHeader: [{
      type: ViewChildren,
      args: [MatStepHeader]
    }],
    _steps: [{
      type: ContentChildren,
      args: [MatStep, {
        descendants: true
      }]
    }],
    _icons: [{
      type: ContentChildren,
      args: [MatStepperIcon, {
        descendants: true
      }]
    }],
    animationDone: [{
      type: Output
    }],
    disableRipple: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    headerPosition: [{
      type: Input
    }],
    animationDuration: [{
      type: Input
    }]
  });
})();
var MatStepperNext = class _MatStepperNext extends CdkStepperNext {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatStepperNext_BaseFactory;
    return function MatStepperNext_Factory(__ngFactoryType__) {
      return (\u0275MatStepperNext_BaseFactory || (\u0275MatStepperNext_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepperNext)))(__ngFactoryType__ || _MatStepperNext);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatStepperNext,
    selectors: [["button", "matStepperNext", ""]],
    hostAttrs: [1, "mat-stepper-next"],
    hostVars: 1,
    hostBindings: function MatStepperNext_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275hostProperty("type", ctx.type);
      }
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperNext, [{
    type: Directive,
    args: [{
      selector: "button[matStepperNext]",
      host: {
        "class": "mat-stepper-next",
        "[type]": "type"
      }
    }]
  }], null, null);
})();
var MatStepperPrevious = class _MatStepperPrevious extends CdkStepperPrevious {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatStepperPrevious_BaseFactory;
    return function MatStepperPrevious_Factory(__ngFactoryType__) {
      return (\u0275MatStepperPrevious_BaseFactory || (\u0275MatStepperPrevious_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepperPrevious)))(__ngFactoryType__ || _MatStepperPrevious);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatStepperPrevious,
    selectors: [["button", "matStepperPrevious", ""]],
    hostAttrs: [1, "mat-stepper-previous"],
    hostVars: 1,
    hostBindings: function MatStepperPrevious_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275hostProperty("type", ctx.type);
      }
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperPrevious, [{
    type: Directive,
    args: [{
      selector: "button[matStepperPrevious]",
      host: {
        "class": "mat-stepper-previous",
        "[type]": "type"
      }
    }]
  }], null, null);
})();
var MatStepperModule = class _MatStepperModule {
  static \u0275fac = function MatStepperModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatStepperModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatStepperModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MAT_STEPPER_INTL_PROVIDER, ErrorStateMatcher],
    imports: [MatCommonModule, PortalModule, CdkStepperModule, MatIconModule, MatRippleModule, MatStepper, MatStepHeader, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, PortalModule, CdkStepperModule, MatIconModule, MatRippleModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      exports: [MatCommonModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      providers: [MAT_STEPPER_INTL_PROVIDER, ErrorStateMatcher]
    }]
  }], null, null);
})();

// src/app/admin/userguide/commonuserguide/commonuserguide.component.ts
function CommonuserguideComponent_div_5_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const block_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(block_r1.description);
  }
}
function CommonuserguideComponent_div_5_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "img", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const block_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate("alt", block_r1.imageAlt);
    \u0275\u0275property("src", ctx_r1.ImageURL + block_r1.imageUrl, \u0275\u0275sanitizeUrl);
  }
}
function CommonuserguideComponent_div_5_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "video", 8);
    \u0275\u0275element(2, "source", 9);
    \u0275\u0275text(3, " Your browser does not support video. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const block_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.ImageURL + block_r1.videoUrl, \u0275\u0275sanitizeUrl)("type", block_r1.videoType);
  }
}
function CommonuserguideComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CommonuserguideComponent_div_5_div_3_Template, 3, 1, "div", 6)(4, CommonuserguideComponent_div_5_div_4_Template, 2, 2, "div", 6)(5, CommonuserguideComponent_div_5_div_5_Template, 4, 2, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const block_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(block_r1.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", block_r1.type === "text");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", block_r1.type === "image");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", block_r1.type === "video");
  }
}
var CommonuserguideComponent = class _CommonuserguideComponent {
  Detail;
  ngOnInit() {
    console.log(this.Detail);
  }
  ImageURL = environment.ImageURL;
  static \u0275fac = function CommonuserguideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CommonuserguideComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommonuserguideComponent, selectors: [["app-commonuserguide"]], inputs: { Detail: "Detail" }, decls: 6, vars: 3, consts: [[1, "flex", "flex-col", "space-y-4", "p-4"], [1, "text-xl", "font-bold"], [1, "text-sm"], ["class", "flex flex-col space-y-2", 4, "ngFor", "ngForOf"], [1, "flex", "flex-col", "space-y-2"], [1, "font-bold"], [4, "ngIf"], [1, "object-cover", 3, "src", "alt"], ["controls", ""], [3, "src", "type"]], template: function CommonuserguideComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, CommonuserguideComponent_div_5_Template, 6, 4, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.Detail.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.Detail.description);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.Detail == null ? null : ctx.Detail.UserguidBlocks);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommonuserguideComponent, { className: "CommonuserguideComponent", filePath: "src/app/admin/userguide/commonuserguide/commonuserguide.component.ts", lineNumber: 13 });
})();

// src/app/admin/adminmain/adminmain.component.ts
var _c05 = ["drawer"];
var _c13 = ["drawer1"];
var _c23 = () => ["/admin/profile"];
var _c33 = () => ["/admin/account"];
var AdminmainComponent = class _AdminmainComponent {
  _breakpointObserver;
  _UserService;
  _ErrorLogService;
  isFullscreen = false;
  showFiller = false;
  Config = Config;
  User = {};
  isQuytrinh = false;
  _transformer = (node, level) => {
    return {
      expandable: !!node?.children && node?.children.length > 0,
      title: node.title,
      level,
      node
    };
  };
  treeControl = new FlatTreeControl((node) => node.level, (node) => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, (node) => node.level, (node) => node.expandable, (node) => node?.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  _MenuService = inject(MenuService);
  constructor(_breakpointObserver, _UserService, _ErrorLogService) {
    this._breakpointObserver = _breakpointObserver;
    this._UserService = _UserService;
    this._ErrorLogService = _ErrorLogService;
  }
  hasChild = (_, node) => node.expandable;
  drawer;
  drawer1;
  _snackBar = inject(MatSnackBar);
  _StorageService = inject(StorageService);
  _UserguideService = inject(UserguideService);
  ListMenu = [];
  FilterListMenu = [];
  DetailUserguide = signal({});
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._UserService.getProfile().then((res) => __async(this, null, function* () {
        if (res) {
          this.User = res;
          const permissions = this.User?.permissions?.map((v) => v.name);
          yield this._MenuService.getTreeMenu(permissions);
          this.ListMenu = this.FilterListMenu = this._MenuService.ListMenu();
          this.dataSource.data = this._MenuService.ListMenu();
        }
      }));
      yield this._UserguideService.getUserguideBy({ codeId: "I100001" });
      this.DetailUserguide = this._UserguideService.DetailUserguide;
      this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = "over";
          this.drawer.close();
        } else {
          this.drawer.mode = "side";
          this.drawer.open();
        }
      });
    });
  }
  logout() {
    this._UserService.logout().then((res) => {
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }
  searchFunction(event) {
    this.FilterListMenu = this.ListMenu.filter((item) => {
      return removeVietnameseAccents(item.title).toLowerCase().includes(event.target.value.toLowerCase()) || item.title.toLowerCase().includes(event.target.value.toLowerCase()) || item?.children?.some((child) => removeVietnameseAccents(child.title).toLowerCase().includes(event.target.value.toLowerCase()) || child.title.toLowerCase().includes(event.target.value.toLowerCase()));
    });
  }
  ClearCache() {
    return __async(this, null, function* () {
      const token = this._StorageService.getItem("token");
      const permissions = this._StorageService.getItem("permissions");
      this._StorageService.deleteAllIndexedDBs();
      this._StorageService.clear();
      if (token) {
        this._StorageService.setItem("token", token);
      }
      if (permissions) {
        this._StorageService.setItem("permissions", permissions);
      }
      yield this._ErrorLogService.ClearRedisCache();
      this._snackBar.open("X\xF3a Cache Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  events = [
    { date: "2025-01-01", title: "Project Start", description: "Initiated the project with team.", icon: "fa-circle" },
    { date: "2025-03-01", title: "Milestone 1", description: "Completed first phase.", icon: "fa-check" },
    { date: "2025-06-01", title: "Milestone 2", description: "Launched beta version.", icon: "fa-rocket" }
  ];
  static \u0275fac = function AdminmainComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminmainComponent)(\u0275\u0275directiveInject(BreakpointObserver), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(ErrorLogService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminmainComponent, selectors: [["app-adminmain"]], viewQuery: function AdminmainComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c05, 7);
      \u0275\u0275viewQuery(_c13, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer1 = _t.first);
    }
  }, decls: 103, vars: 18, consts: [["drawer", ""], ["search", ""], ["menu", "matMenu"], ["menu1", "matMenu"], ["drawer1", ""], ["autosize", "", 1, "!w-screen", "!h-screen"], ["mode", "side", "position", "start", 1, ""], [1, "relative", "h-full", "flex", "flex-col", "space-y-2", "!bg-[#0B9444]", "!text-white"], [1, "relative", "flex", "flex-col", "space-y-2", "p-2"], ["alt", "Logo", 1, "h-20", "object-contain", "rounded-lg", "bg-white", "p-2", 3, "src"], [1, "relative", "flex", "flex-col", "space-y-2", "h-full", "overflow-auto", "p-2"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "input"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [3, "ListMenu"], [1, "relative", "w-full", "justify-between", "flex", "flex-row", "space-x-2", "items-center", "p-2"], [1, "flex", "flex-row", "space-x-2"], ["alt", "Avatar", 1, "max-w-14", "max-h-14", "object-cover", "rounded-full", 3, "src"], [1, "flex", "flex-col"], [1, "font-bold"], [1, "italic", "text-xs"], ["mat-icon-button", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "routerLink"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "h-full", "primary"], [1, "relative", "flex", "flex-row", "space-x-2", "justify-between", "items-center", "p-1", "bg-[#57A345]"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", 3, "click"], ["mat-icon-button", ""], [1, "flex", "flex-row", "space-x-2", "items-center", "p-4"], ["mat-menu-item", "", 3, "href"], ["mode", "over", "position", "end", 1, "!w-screen", "lg:!w-1/2"], [1, "relative", "h-full", "flex", "flex-col", "space-y-2", "p-2"], [1, "relative", "flex", "w-full", "overflow-auto"], [3, "Detail"]], template: function AdminmainComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 5)(1, "mat-drawer", 6, 0)(3, "div", 7)(4, "div", 8);
      \u0275\u0275element(5, "img", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 10)(7, "div", 11)(8, "input", 12, 1);
      \u0275\u0275listener("input", function AdminmainComponent_Template_input_input_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.searchFunction($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 13)(11, "span", 14);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(13, "app-treemenu", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 16)(15, "div", 17);
      \u0275\u0275element(16, "img", 18);
      \u0275\u0275elementStart(17, "div", 19)(18, "div", 20);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 21);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 21);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "button", 22)(25, "mat-icon");
      \u0275\u0275text(26, "more_vert");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "mat-menu", null, 2)(29, "a", 23)(30, "mat-icon");
      \u0275\u0275text(31, "account_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span");
      \u0275\u0275text(33, "Profile");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "a", 23)(35, "mat-icon");
      \u0275\u0275text(36, "account_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38, "Account");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "button", 24)(40, "mat-icon");
      \u0275\u0275text(41, "settings");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "span");
      \u0275\u0275text(43, "Settings");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "button", 25);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_44_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.logout());
      });
      \u0275\u0275elementStart(45, "mat-icon");
      \u0275\u0275text(46, "logout");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "span");
      \u0275\u0275text(48, "Logout");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(49, "div", 26)(50, "div", 27)(51, "div", 28)(52, "button", 29);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_52_listener() {
        \u0275\u0275restoreView(_r1);
        const drawer_r2 = \u0275\u0275reference(2);
        return \u0275\u0275resetView(drawer_r2.toggle());
      });
      \u0275\u0275elementStart(53, "mat-icon");
      \u0275\u0275text(54, "menu");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "button", 30)(56, "mat-icon");
      \u0275\u0275text(57, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(58, "div", 28)(59, "button", 29);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_59_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ClearCache());
      });
      \u0275\u0275elementStart(60, "mat-icon");
      \u0275\u0275text(61, "cached");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "button", 29);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_62_listener() {
        \u0275\u0275restoreView(_r1);
        const drawer1_r3 = \u0275\u0275reference(93);
        drawer1_r3.toggle();
        return \u0275\u0275resetView(ctx.isQuytrinh = true);
      });
      \u0275\u0275elementStart(63, "mat-icon");
      \u0275\u0275text(64, "dashboard");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(65, "button", 29);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_65_listener() {
        \u0275\u0275restoreView(_r1);
        const drawer1_r3 = \u0275\u0275reference(93);
        return \u0275\u0275resetView(drawer1_r3.toggle());
      });
      \u0275\u0275elementStart(66, "mat-icon");
      \u0275\u0275text(67, "notifications");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "button", 29);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_68_listener() {
        \u0275\u0275restoreView(_r1);
        const drawer1_r3 = \u0275\u0275reference(93);
        return \u0275\u0275resetView(drawer1_r3.toggle());
      });
      \u0275\u0275elementStart(69, "mat-icon");
      \u0275\u0275text(70, "chat");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "button", 22)(72, "mat-icon");
      \u0275\u0275text(73, "account_circle");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "mat-menu", null, 3)(76, "div", 31);
      \u0275\u0275element(77, "img", 18);
      \u0275\u0275elementStart(78, "div", 19)(79, "div", 20);
      \u0275\u0275text(80);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "div", 21);
      \u0275\u0275text(82);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "div", 21);
      \u0275\u0275text(84);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(85, "a", 32);
      \u0275\u0275text(86, "Th\xF4ng Tin");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "button", 24);
      \u0275\u0275text(88, "C\xE0i \u0110\u1EB7t");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "button", 25);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_89_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.logout());
      });
      \u0275\u0275text(90, "\u0110\u0103ng Xu\u1EA5t");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275element(91, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "mat-drawer", 33, 4)(94, "div", 34)(95, "div", 28)(96, "button", 29);
      \u0275\u0275listener("click", function AdminmainComponent_Template_button_click_96_listener() {
        \u0275\u0275restoreView(_r1);
        const drawer1_r3 = \u0275\u0275reference(93);
        return \u0275\u0275resetView(drawer1_r3.toggle());
      });
      \u0275\u0275elementStart(97, "mat-icon");
      \u0275\u0275text(98, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(99, "span", 20);
      \u0275\u0275text(100, "Quy Tr\xECnh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(101, "div", 35);
      \u0275\u0275element(102, "app-commonuserguide", 36);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      const menu_r4 = \u0275\u0275reference(28);
      const menu1_r5 = \u0275\u0275reference(75);
      \u0275\u0275advance(5);
      \u0275\u0275property("src", ctx.Config.Logoimage, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(8);
      \u0275\u0275property("ListMenu", ctx.FilterListMenu);
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.User == null ? null : ctx.User.Avatar, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.User == null ? null : ctx.User.Hoten);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.User == null ? null : ctx.User.Vitri);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.User == null ? null : ctx.User.email);
      \u0275\u0275advance();
      \u0275\u0275property("matMenuTriggerFor", menu_r4);
      \u0275\u0275advance(5);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(16, _c23));
      \u0275\u0275advance(5);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(17, _c33));
      \u0275\u0275advance(37);
      \u0275\u0275property("matMenuTriggerFor", menu1_r5);
      \u0275\u0275advance(6);
      \u0275\u0275property("src", ctx.User == null ? null : ctx.User.Avatar, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.User == null ? null : ctx.User.Hoten);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.User == null ? null : ctx.User.Vitri);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.User == null ? null : ctx.User.email);
      \u0275\u0275advance();
      \u0275\u0275property("href", "/admin/profile", \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(17);
      \u0275\u0275property("Detail", ctx.DetailUserguide());
    }
  }, dependencies: [
    MatTreeModule,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatIcon,
    RouterOutlet,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    RouterLink,
    // RouterLinkActive,
    TreemenuComponent,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    CommonuserguideComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminmainComponent, { className: "AdminmainComponent", filePath: "src/app/admin/adminmain/adminmain.component.ts", lineNumber: 51 });
})();

export {
  AdminmainComponent
};
//# sourceMappingURL=chunk-LRV7H3NQ.js.map
