const ticketsExampleList = [
  {
    "id": "73144831-56ec-4c40-89a8-c3b85ef46713",
    "price": 8100,
    "companyId": {
      "id": "cddfa038-823b-43b1-b18d-395731881077",
      "name": "S7 Airlines",
      "logo": "S7 Logo.png"
    },
    "segments": [
      {
        "id": "885e1a50-305f-4106-b075-6c35f8e1f184",
        "dateStart": 1643065200000,
        "dateEnd": 1643097600000,
        "origin": "MOW",
        "destination": "HKG",
        "stops": [
          "HKT",
          "EKV",
          "PTB"
        ],
        "duration": 32400000
      },
      {
        "id": "11b11717-c5d0-40bc-832c-671c7ce11374",
        "dateStart": 1643101200000,
        "dateEnd": 1643119200000,
        "origin": "KRS",
        "destination": "EKT",
        "stops": [
          "PTB"
        ],
        "duration": 18000000
      }
    ]
  },
  {
    "id": "cb4d1968-fd11-424f-b7d1-71dcf7bb89f4",
    "price": '47 100',
    "companyId": {
      "id": "7dc12d0b-ce42-48a0-8673-0dad4d698764",
      "name": "XiamenAir",
      "logo": "XiamenAir Logo.png"
    },
    "segments": [
      {
        "id": "eebb2f7b-07c5-4149-ada3-0f1a08c44f1b",
        "dateStart": 1643065200000,
        "dateEnd": 1643097600000,
        "origin": "MOW",
        "destination": "EKT",
        "stops": [
          "EKV",
          "JNB",
          "KRS"
        ],
        "duration": 32400000
      }
    ]
  }
]
const app = (function () {
  const api = {
    views: {},
    models: {},
    collections: {},
    tickets: null,
    init() {
      this.tickets = new api.collections.TicketCollection()
      ViewsFactory.ticketsList();
      ViewsFactory.sortTickets();
      return this;
    }
  };
  
  const ViewsFactory = {
    ticketsList() {
      if (!this.listView) {
        this.listView = new api.views.ticketsList({
          model: api.tickets
        });
      }
      return this.listView;
    },
    sortTickets() {
      if (!this.ticketsSort) {
        this.ticketsSort = new api.views.costingSelectView({
          model: api.tickets
        })
      }
    }
  }
  return api;
})();
window.onload = () => {
  app.init();
}