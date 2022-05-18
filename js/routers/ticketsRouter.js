const TicketsRouter = Backbone.Router.extend({
  routes: {
    ':id': 'page'
  },

  navigate(page) {
    Backbone.history.navigate(`#${page}`, {trigger: true, replace: true});
  },

  page(id) {
    if (App.routerArr) {
      App.models.ticketsFiltersModel.set('page', id);
    }
  }
})