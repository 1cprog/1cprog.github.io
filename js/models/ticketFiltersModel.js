const TicketFiltersModel = Backbone.Model.extend({
  companyFilter: false,
  stopsFilter: false,
  ticketsFilter: false,
  defaults: {
    companyId: '0',
    sortBy: null,
    stops: null,
    page: 1
  },

  initialize() {
    this.on('change', this.handleFilter, this);
  },

  changePageNumber() {
    App.filteredData.reset();
    if (this.get('page') - 1 > App.routerArr.length) {
      this.set('page', App.routerArr.length);
      App.routers.ticketsRouter.navigate(this.get('page'));
    }
    App.filteredData.set(App.routerArr[this.get('page') - 1]);
    App.views.ticketsListView.render();
  },

  handleFilter() {
    App.filteredData = App.collection.ticketCollection.clone();
    if (this.companyFilter) {
      App.views.companyFilterView.filterTickets(this.get('companyId'));
    }

    if (this.stopsFilter) {
      App.views.stopsFilterView.filterTickets(this.get('stops'));
    }

    if (this.ticketsFilter) {
      App.views.costingSelectView.changeCurrentFilter(this.get('sortBy'));
    }

    // Split final array for pagination.
    App.routerArr = _.chunk(App.filteredData.models, 10);
    this.changePageNumber();
    $('.page-list').html('');

    for (let i = 0; i < App.routerArr.length; i++) {
      const page = new PaginatorView();
      page.render({
        pageId: i + 1
      });
    }
  }
})