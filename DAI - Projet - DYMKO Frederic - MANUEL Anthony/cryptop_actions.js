
//------------------------------------------------------------------ Actions ---
// Actions appelées dans le code HTML quand des événements surviennent
//
actions = {

  //------------------------------- Initialisation et chargement des données ---

  async initAndGo(initialConfig) {
    console.log('initAndGo: ', initialConfig);

    if (initialConfig.config.dataMode == 'online') {
      const params = {
        target : initialConfig.config.targets.wished,
        debug  : initialConfig.config.debug,
      };
      let coinlayerData = await coinlayerRequest(params);
      if (coinlayerData.success) {
        initialConfig.data.online = coinlayerData;
      } else {
        console.log('initAndGo: Données en ligne indisponibles');
        console.log('initAndGo: BASCULEMENT EN MODE HORS-LIGNE');
        initialConfig.config.dataMode = 'offline';
      }
    }
  model.samPresent({do:'init', config:initialConfig});
  },

  reinit(data) {
    const initialConfigName =  data.e.target.value;
    configsSelected = initialConfigName;
    actions.initAndGo(configs[initialConfigName]);
  },

  async updateOnlineCurrenciesData(data) {
    const params = {
      debug  : data.debug,
      target : data.target,
    };
    let coinlayerData = await coinlayerRequest(params);
    if (coinlayerData.success) {
      model.samPresent({do:'updateCurrenciesData', currenciesData: coinlayerData});
    } else {
      console.log('updateOnlineCurrenciesData: Données en ligne indisponibles');
      console.log('updateOnlineCurrenciesData: BASCULEMENT EN MODE HORS-LIGNE');
      model.samPresent({do:'changeDataMode', dataMode:'offline'});
    }
  },

  //----------------------------------------------------------- CurrenciesUI ---

  changeFilterTab(data) {
    model.samPresent({do: 'changeFilter', filter: data.value, id: data.id});
  },

  changeSort(data) {
    model.samPresent({do: 'changeSort', sort: data.id});
  },

  changePage(data) {
    model.samPresent({do: 'changePage', value: data.v});
  },

  changeLength(data) {
    model.samPresent({do: 'changePageLength', value: data.v});
  },
  
  changeStatus(data) {
    model.samPresent({do: 'changeStatus', id: data.id});
  },
  // TODO: ajoutez vos fonctions...

  //----------------------------------------------- CurrenciesUI et WalletUI ---
  changeTab(data) {
    model.samPresent({do:'changeTab', ...data});
  },

  //----------------------------------------------------------- CurrenciesUI ---

  // TODO: ajoutez vos fonctions...


  //---------------------------------------------------------- PreferencesUI ---

  changeTarget(data) {
    data.target = data.e.target.value;
    delete data.e;
    this.updateOnlineCurrenciesData(data)
  },

  changeDataMode(data) {
    data.dataMode = data.e.target.value;
    delete data.e;
    if (data.dataMode == 'online') {
      this.updateOnlineCurrenciesData(data)
    }
    model.samPresent({do:'changeDataMode', ...data});
  },

  //--------------------------------------------------------------- WalletUI ---

  updateCoins() {
    model.samPresent({do: 'updateCoins'});
  },

  updateValues(data) {
    model.samPresent({do: 'updateValues', id: data.id, value: data.v});
  },

  resetWallet() {
    model.samPresent({do: 'resetWallet'});
  },
  // TODO: ajoutez vos fonctions...

  TotalPortefolio(data) // Met a jour tous les totaux du Portefolio (Amélioration possible : met seulement à jour la ligne concernée par le changement.).
  {
    model.samPresent({do: 'updateTotal' , id : data.name , qte : data.qte});
  },

  confirmerPortefolio()
  {
    model.samPresent({do: 'acceptPortefolio'});
  },

  annulerPortefolio()
  {
    
  },
};  
