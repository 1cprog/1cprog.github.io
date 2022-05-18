const CompanyFilterView = Backbone.View.extend({
  el: $('.company-radio-button-wrapper'),
  template: Handlebars.compile(document.querySelector('#company-filter').innerHTML),
  events: {
    'change input': 'filterCompany'
  },

  preinitialize() {
    this.once('render', this.setInitFilter, this);
  },

  initialize() {
    this.render();
  },

  setInitFilter() {
    const allCompany = this.$el.find('input').eq(0);
    allCompany.attr('checked', true);
  },

  render() {
    const companiesCollection = App.collection.companiesCollection;
    companiesCollection.comparator = 'name';
    const companies = companiesCollection.sort().toJSON();
    companies.unshift({
      id: '0',
      name: 'Все компании'
    })

    this.el.innerHTML = this.template({
      company: companies
    });
    this.trigger('render');
    return this;
  },

  filterTickets(data) {
    const companyFilter = App.filteredData.filter(el => {
      if (el.get('company').id === data) {
        return true;
      }
    });
    App.filteredData.set(companyFilter);
  },

  filterCompany(event) {
    const targetId = $(event.target).attr('id');
    if (targetId === "0") {
      App.models.ticketsFiltersModel.companyFilter = false;
    } else {
      App.models.ticketsFiltersModel.companyFilter = true;
      App.models.ticketsFiltersModel.set('companyId', targetId);
    }
    App.models.ticketsFiltersModel.trigger('change');
  }
})