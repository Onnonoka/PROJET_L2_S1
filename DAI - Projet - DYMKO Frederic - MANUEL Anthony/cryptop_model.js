
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
        this.ui.currenciesCard.tabs[this.ui.currenciesCard.selectedTab].filters[data.id] = data.filter;
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

      case 'changeStatus':
        if (model.ui.currenciesCard.selectedTab === 'cryptos') {
          let coins = this.config.coins;
          let pos = Object.keys(coins).indexOf(data.id);
          if (pos === -1) {
            coins[data.id] = {quantity: 0, quantityNew: ''};
          } else if (coins[data.id].quantity === 0 && (coins[data.id].quantityNew === '' || coins[data.id].quantityNew === '0')) {
            delete coins[data.id];
          }
        } else {
          let target = this.config.targets;
          let pos = target.list.indexOf(data.id);
          if (pos === -1) {
            target.list.push(data.id);
          } else if (target.list[pos] !== target.active) {
            target.list.splice(pos, 1);
          }
        }
        this.hasChanged.coins = true;
        console.log(this.config.coins);
      break;

      case 'updateCoins': 
        coins = this.config.coins;
        Object.values(coins).forEach(element => {
          if (element.quantityNew === '') {
            element.quantityNew = '0';
          }
        });
        Object.values(coins).forEach(element => {
          if (!isNaN(element.quantityNew) && parseInt(element.quantityNew) > 0) {
            element.quantity += parseInt(element.quantityNew);
          }
        });

        this.hasChanged.coins = true;
      break;

      case 'updateValues':
        coins = this.config.coins;
        coins[data.id].quantityNew = data.value;
        this.hasChanged.coins = true;
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
