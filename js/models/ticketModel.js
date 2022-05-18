const TicketModel = Backbone.Model.extend({
  formatPrice() {
    let priceFormatted = this.get('price').toString();
    return priceFormatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
})