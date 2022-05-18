const App = {
  views: {},
  models: {},
  collection: {},
  routers: {},
  filteredData: {},

  init() {
    const loadCompanies = new Promise((resolve, reject) => {
      this.collection.companiesCollection = new CompaniesCollection();
      resolve(this.collection.companiesCollection.fetch());

      reject("Can't load companies.json");
    });
    const loadSegments = new Promise((resolve, reject) => {
      this.collection.segmentsCollection = new SegmentsCollection();
      resolve(this.collection.segmentsCollection.fetch());

      reject("Can't load segments.json");
    })
    const loadTickets = new Promise((resolve, reject) => {
      this.collection.ticketCollection = new TicketCollection();
      resolve(this.collection.ticketCollection.fetch());

      reject("Can't load tickets.json");
    })

    const load = Promise.all([loadCompanies, loadSegments, loadTickets]);

    async function loadCollection() {
      const result = await load;
    }

    loadCollection()
      .then(() => {
        this.composeTicket();
      })
      .then(() => {
        this.routers.ticketsRouter = new TicketsRouter();
        Backbone.history.start();
        this.routers.ticketsRouter.navigate(1);
        this.views.ticketsListView = new TicketsListView();
        this.views.costingSelectView = new CostingSelectView();
        this.views.companyFilterView = new CompanyFilterView();
        this.views.stopsFilterView = new StopsFilterView();
      })
      .catch(err => {
        console.error('Error:', err);
      });
  },

  composeTicket() {
    const tickets = this.collection.ticketCollection;
    const companies = this.collection.companiesCollection;
    const segments = this.collection.segmentsCollection;
    tickets.forEach(el => {
      el.set('priceFormatted', el.formatPrice());
      const companyId = el.get('companyId');
      const selectedCompany = companies.filter(el => el.id === companyId)[0];
      el.set('company', selectedCompany.toJSON());
      el.unset('companyId');
      const segmentsArr = [];
      let totalDuration = 0;
      let stopsTotal = 0;
      for (const segment of el.get('segments')) {
        const selectedSegment = segments.filter(el => el.id === segment)[0];
        totalDuration += selectedSegment.get('duration')

        const startTime = selectedSegment.get('dateStart');
        selectedSegment.set('startTime', selectedSegment.timeFormat(startTime));

        const endTime = selectedSegment.get('dateEnd');
        selectedSegment.set('endTime', selectedSegment.timeFormat(endTime));

        selectedSegment.set('duration', selectedSegment.getStrDuration());

        selectedSegment.set('stops', selectedSegment.stopsParse());
        stopsTotal += selectedSegment.get('stops').stopsArr.length;
        segmentsArr.push(selectedSegment.toJSON());
      }
      el.set({
        totalDuration,
        stopsTotal,
        segments: segmentsArr
      })
    })
    this.models.ticketsFiltersModel = new TicketFiltersModel();
    this.filteredData = tickets.clone();
  }
}

window.onload = () => {
  App.init();
}