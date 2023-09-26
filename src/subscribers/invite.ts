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