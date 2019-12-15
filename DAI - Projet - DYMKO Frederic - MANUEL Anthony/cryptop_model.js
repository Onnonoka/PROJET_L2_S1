
//-------------------------------------------------------------------- Model ---
// Unique source de vérité de l'application
//
model = {

  config: {},
  data : {},
  ui   : {},

  // Demande au modèle de se mettre à jour en fonction des données qu'on
  // lui présente.
  // l'argument data est un objet confectionné dans les actions.
  // Les propriétés de data apportent les modifications à faire sur le modèle.
  samPresent(data) {

    switch (data.do) {

      case 'init': {
        Object.assign(this, data.config);
        const conf = this.config;
        conf.targets.list = mergeUnique([conf.targets.wished], conf.targets.list).sort();
        const isOnline = conf.dataMode == 'online';
        conf.targets.active = isOnline ? conf.targets.wished : this.data.offline.live.target;
        this.hasChanged.currencies = true;
        if (conf.debug) console.log('model.samPresent - init - targets.list  : ', conf.targets.list);
        if (conf.debug) console.log('model.samPresent - init - targets.active: ', conf.targets.active);
      } break;

      case 'updateCurrenciesData': {
        this.data.online = data.currenciesData;
        this.config.targets.active = data.currenciesData.live.target;
        this.hasChanged.currencies = true;
      } break;

      case 'changeDataMode': {
        this.config.dataMode = data.dataMode;
        if (data.dataMode == 'offline') {
          this.config.targets.active = this.data.offline.live.target;
          this.hasChanged.currencies = true;
        }
      } break;

      case 'changeTab': {
        switch (data.tab) {
          case 'currenciesCryptos':
            this.ui.currenciesCard.selectedTab = 'cryptos';
            break;
          case 'currenciesFiats':
            this.ui.currenciesCard.selectedTab = 'fiats';
            break;
          case 'walletPortfolio':
            this.ui.walletCard.selectedTab = 'portfolio';
            break;
          case 'walletAjouter':
            this.ui.walletCard.selectedTab = 'ajouter';
            break;
            default:
        }
      } break;

      case 'changeFilter' :
        if (data.id === 'price') {
          this.ui.currenciesCard.tabs[this.ui.currenciesCard.selectedTab].filters.price = data.filter;
        } else {
          this.ui.currenciesCard.tabs[this.ui.currenciesCard.selectedTab].filters.text = data.filter;
        }
        this.ui.currenciesCard.tabs[this.ui.currenciesCard.selectedTab].pagination.currentPage = 1;

        this.hasChanged[this.ui.currenciesCard.selectedTab].filter = true;
        this.hasChanged[this.ui.currenciesCard.selectedTab].pagination = true;
      break;

      case 'changeSort' :
        let sort = this.ui.currenciesCard.tabs[this.ui.currenciesCard.selectedTab].sort;
        if (sort.columns[sort.column] === data.sort) {
          sort.incOrder[sort.column] = !sort.incOrder[sort.column];
        } else {
          sort.columns[sort.column] === true;
          sort.column = sort.columns.indexOf(data.sort);
        }
        this.hasChanged[this.ui.currenciesCard.selectedTab].sort = true;
      break;

      case 'changePage': 
        this.ui.currenciesCard.tabs[this.ui.currenciesCard.selectedTab].pagination.currentPage = data.value;
        this.hasChanged[this.ui.currenciesCard.selectedTab].pagination = true;
      break;

      case 'changePageLength':
        this.ui.currenciesCard.tabs[model.ui.currenciesCard.selectedTab].pagination.rowsPerPageIndex = data.value;
        this.hasChanged[model.ui.currenciesCard.selectedTab].pagination = true;
      break;
      // TODO: ajoutez des cas répondant à vos actions...
      

      default:
        console.error(`model.samPresent(), unknown do: '${data.do}' `);
    }
    // Demande à l'état de l'application de prendre en compte la modification
    // du modèle
    state.samUpdate(this);
  }
};
