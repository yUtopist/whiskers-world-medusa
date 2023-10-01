# Custom subscribers

You may define custom eventhandlers, `subscribers` by creating files in the `/subscribers` directory.

```ts
import MyCustomService from "../services/my-custom";
import { EntityManager } from "typeorm";
import { OrderService } from "@medusajs/medusa";
import { IEventBusService } from "@medusajs/types";

export default class MySubscriber {
  protected readonly manager_: EntityManager;
  protected readonly myCustomService_: MyCustomService

  constructor(
    {
      manager,
      eventBusService,
      myCustomService,
    }: {
      manager: EntityManager;
      eventBusService: IEventBusService;
      myCustomService: MyCustomService;
    }
  ) {
    this.manager_ = manager;
    this.myCustomService_ = myCustomService;

    eventBusService.subscribe(OrderService.Events.PLACED, this.handleOrderPlaced);
  }

  handleOrderPlaced = async (data): Promise<any> => {
    return true;
  }
}

```

A subscriber is defined as a `class` which is registered as a subscriber by invoking `eventBusService.subscribe` in the `constructor` of the class.

The type of event that the subscriber subscribes to is passed as the first parameter to the `eventBusService.subscribe` and the eventhandler is passed as the second parameter. The types of events a service can emmit are described in the individual service.

An eventhandler has one parameter; a data `object` which contain information relating to the event, including relevant `id's`. The `id` can be used to fetch the appropriate entity in the eventhandler.



Current code as follows:

```ts
import { EventBusService } from "@medusajs/medusa"
type InjectedDependencies = {
  eventBusService: EventBusService
  sendgridService: any
}
class InviteSubscriber {
  protected sendGridService: any
  constructor({ 
    eventBusService,
    sendgridService, 
  }: InjectedDependencies) {
    this.sendGridService = sendgridService
    eventBusService.subscribe(
      "invite.created", 
      this.handleInvite
    )
  }
  handleInvite = async (data: Record<string, any>) => {
    this.sendGridService.sendEmail({
      to: data.user_email,
      from: "no-reply@whiskersworld.store",
      templateId: "send-invite",
      dynamic_template_data: {
        token: data.token
      }
    })
  }
}
export default InviteSubscriber
``````