import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SupportService } from './support.service';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { CreateTicketInput, UpdateTicketInput, CreateResponseInput } from './dto/support.input';
import { SupportTicket, SupportResponse } from './entities/support.entity';

@Resolver()
@UseGuards(JwtAuthGuard)
export class SupportResolver {
  constructor(private readonly supportService: SupportService) {}

  @Query(() => [SupportTicket])
  async tickets(
    @CurrentUser() user: any,
    @Args('status', { nullable: true }) status?: string,
    @Args('priority', { nullable: true }) priority?: string,
  ) {
    return this.supportService.findTickets(user, status, priority);
  }

  @Query(() => SupportTicket, { nullable: true })
  async ticket(@Args('id') id: string) {
    return this.supportService.findTicketById(id);
  }

  @Mutation(() => SupportTicket)
  async createTicket(
    @CurrentUser() user: any,
    @Args('input') input: CreateTicketInput,
  ) {
    return this.supportService.createTicket(user, input);
  }

  @Mutation(() => SupportTicket)
  async updateTicket(
    @Args('id') id: string,
    @Args('input') input: UpdateTicketInput,
  ) {
    return this.supportService.updateTicket(id, input);
  }

  @Mutation(() => SupportResponse)
  async addResponse(
    @CurrentUser() user: any,
    @Args('ticketId') ticketId: string,
    @Args('input') input: CreateResponseInput,
  ) {
    return this.supportService.addResponse(user, ticketId, input);
  }

  @Mutation(() => Boolean)
  async deleteTicket(@Args('id') id: string) {
    return this.supportService.deleteTicket(id);
  }

  @Mutation(() => Boolean)
  async assignTicket(
    @Args('ticketId') ticketId: string,
    @Args('technicianId') technicianId: string,
  ) {
    return this.supportService.assignTicket(ticketId, technicianId);
  }
}
