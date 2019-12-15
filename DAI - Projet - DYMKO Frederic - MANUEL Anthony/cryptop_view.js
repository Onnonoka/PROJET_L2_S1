
//--------------------------------------------------------------------- View ---
// Génération de portions en HTML et affichage
//
view = {

  // Injecte le HTML dans une balise de la page Web.
  samDisplay(sectionId, representation) {
    const section = document.getElementById(sectionId);
    section.innerHTML = representation;
  },

  // Renvoit le HTML de l'interface complète de l'application
  appUI(model, state) {
    const configsChooserHTML = this.configsChooserUI();
    return `
    <div class="container">
      ${configsChooserHTML}
      <h1 class="text-center">Portfolio Cryptos</h1>
      <br />
      <div class="row">
        <div class="col-lg-6">
            ${state.representations.currencies}
        <br />
        </div>

        <div class="col-lg-6">
          ${state.representations.preferences}
          <br />
          ${state.representations.wallet}
          <br />
        </div>
      </div>
    </div>
    `;
  },

  configsChooserUI() {
    const options = Object.keys(configs).map(v => {
      const selected = configsSelected == v ? 'selected="selected"' : '';
      return `
      <option ${selected}>${v}</option>
      `;
    }).join('\n');
    return `
    <div class="row">
      <div class="col-md-7"></div>
      <div class="col-md-5">
      <br />
        <div class="d-flex justify-content-end">
          <div class="input-group">
            <div class="input-group-prepend ">
              <label class="input-group-text">Config initiale :</label>
            </div>
            <select class="custom-select" onchange="actions.reinit({e:event})">
              ${options}
            </select>
          </div>
        </div>
      </div>
    </div>
    <br />
    `;
  },

  currenciesUI(model, state) {
    const tabName = model.ui.currenciesCard.selectedTab;
    switch (tabName) {
      case 'cryptos': return this.currenciesCrytopsUI(model, state); break;
      case 'fiats'  : return this.currenciesFiatsUI  (model, state); break;
      default:
        console.error('view.currenciesUI() : unknown tab name: ', tabName);
        return '<p>Error in view.currenciesUI()</p>';
    }
  },

  currenciesCrytopsUI(model, state) {

    let list = state.data.cryptos.filtered;
    const pagination = model.ui.currenciesCard.tabs.cryptos.pagination;
    let pageLength = pagination.rowsPerPage[pagination.rowsPerPageIndex];
    let dataHTML = '';
    let i = pagination.currentPage * pageLength - pageLength;
    if (i < 0 ) i = 0;
    while (i < pageLength * pagination.currentPage && i < list.length) {
      let element = list[i];
      let dataClass = ''; 
      let coins = Object.keys(model.config.coins);
      pos = coins.indexOf(element.code);
      if (pos !== -1) {
        if (model.config.coins[element.code].quantity > 0) {
          dataClass = 'bg-success text-light';
        } else {
          dataClass = 'bg-warning';
        }
      }
      let change = element.change.toFixed(3);
      change += (element.change > 1)? ' ↗' : (element.change === 0)? ' ∼' : ' ↘';

      dataHTML += `
        <tr class="${dataClass}" onclick="actions.changeCryptoStatus({id: '${element.code}'})">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="${element.icon_url}" /> ${element.code}
            </span></td>
          <td><b>${element.name}</b></td>
          <td class="text-right"><b>${element.price.toFixed(2)}</b></td>
          <td class="text-right">${change}</td>
        </tr>
      `
      i++;
    }

    let coins = model.config.coins;
    let keys = Object.keys(coins).sort();

    favorite = keys.map(x => {
      if(coins[x].quantity === 0) {
        return `<span class="badge badge-warning">${x}</span>`;
      } else {
        return `<span class="badge badge-success">${x}</span>`;
      }
    });


    const paginationHTML = this.paginationUI(model, state, 'cryptos');

    return `
    <div class="card border-secondary" id="currencies">
      <div class="card-header">
        <ul class="nav nav-pills card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#currencies"> Cryptos <span
                class="badge badge-light">${state.data.cryptos.filteredNum} / ${state.data.cryptos.listNum}</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-secondary" href="#currencies"
              onclick="actions.changeTab({tab:'currenciesFiats'})"> Monnaies cibles
              <span class="badge badge-secondary">10 / 167</span></a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-append">
            <span class="input-group-text">Filtres : </span>
          </div>
          <input value="${model.ui.currenciesCard.tabs.cryptos.filters.text}" id="filterText" type="text" class="form-control"
            placeholder="code ou nom..." onchange="actions.changeFilterTab({value: value, id:'text'})"/>
          <div class="input-group-append">
            <span class="input-group-text">Prix &gt; </span>
          </div>
          <input id="filterSup" type="number" class="form-control" value="${model.ui.currenciesCard.tabs.cryptos.filters.price}" min="0" onchange="actions.changeFilterTab({value: value, id:'price'})"/>
        </div> <br />
        <div class="table-responsive">
          <table class="col-12 table table-sm table-bordered">
            <thead>
              <th class="align-middle text-center col-2">
                <a href="#currencies" onclick="actions.changeSort({id: 'code'})">Code</a>
              </th>
              <th class="align-middle text-center col-5">
                <a href="#currencies" onclick="actions.changeSort({id: 'name'})">Nom</a>
              </th>
              <th class="align-middle text-center col-2">
                <a href="#currencies" onclick="actions.changeSort({id: 'price'})">Prix</a>
              </th>
              <th class="align-middle text-center col-3">
                <a href="#currencies" onclick="actions.changeSort({id: 'change'})">Variation</a>
              </th>
            </thead>
            ${dataHTML}
          </table>
        </div>
        ${paginationHTML}
      </div>
      <div class="card-footer text-muted"> Cryptos préférées :
        ${favorite}
      </div>
    </div>
    `;

    /*return `
    <div class="card border-secondary" id="currencies">
      <div class="card-header">
        <ul class="nav nav-pills card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#currencies"> Cryptos <span
                class="badge badge-light">10 / 386</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-secondary" href="#currencies"
              onclick="actions.changeTab({tab:'currenciesFiats'})"> Monnaies cibles
              <span class="badge badge-secondary">10 / 167</span></a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-append">
            <span class="input-group-text">Filtres : </span>
          </div>
          <input value="coin" id="filterText" type="text" class="form-control"
            placeholder="code ou nom..."/>
          <div class="input-group-append">
            <span class="input-group-text">Prix &gt; </span>
          </div>
          <input id="filterSup" type="number" class="form-control" value="5" min="0" />
        </div> <br />
        <div class="table-responsive">
          <table class="col-12 table table-sm table-bordered">
            <thead>
              <th class="align-middle text-center col-2">
                <a href="#currencies">Code</a>
              </th>
              <th class="align-middle text-center col-5">
                <a href="#currencies">Nom</a>
              </th>
              <th class="align-middle text-center col-2">
                <a href="#currencies">Prix</a>
              </th>
              <th class="align-middle text-center col-3">
                <a href="#currencies">Variation</a>
              </th>
            </thead>
            <tr id="00" class="bg-warning">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/BCH.png" /> BCH
                </span></td>
              <td><b>Bitcoin Cash / BCC</b></td>
              <td class="text-right"><b>253.44</b></td>
              <td class="text-right">6.727 ↗</td>
            </tr>
            <tr class="">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/BNB.png" /> BNB
                </span></td>
              <td><b>Binance Coin</b></td>
              <td class="text-right"><b>19.29</b></td>
              <td class="text-right">0.000 ∼</td>
            </tr>
            <tr class="bg-success text-light">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/BTC.png" /> BTC
                </span></td>
              <td><b>Bitcoin</b></td>
              <td class="text-right"><b>7885.74</b></td>
              <td class="text-right">-113.601 ↘</td>
            </tr>
            <tr class="">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/BTG.png" /> BTG
                </span></td>
              <td><b>Bitcoin Gold</b></td>
              <td class="text-right"><b>7.41</b></td>
              <td class="text-right">-0.313 ↘</td>
            </tr>
            <tr class="bg-warning">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/BTLC.png" /> BTLC
                </span></td>
              <td><b>BitLuckCoin</b></td>
              <td class="text-right"><b>8.17</b></td>
              <td class="text-right">-0.004 ↘</td>
            </tr>
            <tr class="bg-warning">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/DSH.png" /> DSH
                </span></td>
              <td><b>Dashcoin</b></td>
              <td class="text-right"><b>228.86</b></td>
              <td class="text-right">-0.125 ↘</td>
            </tr>
            <tr class="bg-success text-light">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/LTC.png" /> LTC
                </span></td>
              <td><b>Litecoin</b></td>
              <td class="text-right"><b>54.04</b></td>
              <td class="text-right">-1.519 ↘</td>
            </tr>
            <tr class="">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/NMC.png" /> NMC
                </span></td>
              <td><b>NameCoin</b></td>
              <td class="text-right"><b>5.33</b></td>
              <td class="text-right">-0.003 ↘</td>
            </tr>
            <tr class="">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/SBC.png" /> SBC
                </span></td>
              <td><b>StableCoin</b></td>
              <td class="text-right"><b>6.35</b></td>
              <td class="text-right">-0.003 ↘</td>
            </tr>
            <tr class="">
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/TRC.png" /> TRC
                </span></td>
              <td><b>TerraCoin</b></td>
              <td class="text-right"><b>5.63</b></td>
              <td class="text-right">-0.003 ↘</td>
            </tr>
          </table>
        </div>
        ${paginationHTML}
      </div>
      <div class="card-footer text-muted"> Cryptos préférées :
        <span class="badge badge-warning">BCH</span>
        <span class="badge badge-success">BTC</span>
        <span class="badge badge-warning">BTLC</span>
        <span class="badge badge-warning">DSH</span>
        <span class="badge badge-success">ETH</span>
        <span class="badge badge-success">LTC</span>
        <span class="badge badge-warning">XMR</span>
      </div>
    </div>
    `;*/
  },

  paginationUI(model, state, currency) {
    let tabs = model.ui.currenciesCard.selectedTab;
    let modelPagination = model.ui.currenciesCard.tabs[tabs].pagination;
    let currentPage = modelPagination.currentPage;
    let statePagination = state.ui.currenciesCard.tabs[tabs].pagination;
    let pages = `<li class="${(currentPage === 1)? 'page-item disabled': ''}">
                    <a class="page-link" href="#currencies" onclick="actions.changePage({v: ${(currentPage === 1)? '': currentPage - 1}})">&lt;</a>
                 </li>
                 `;


    
    let i = modelPagination.currentPage;
    let iMax;
    if (i <= 4) {
      i = 1;
      iMax = (statePagination.nbPages > 8)? 8 : statePagination.nbPages;
    } else if (i > statePagination.nbPages - 4) {
      i = statePagination.nbPages - 7;
      iMax = statePagination.nbPages;
    } else {
      i = modelPagination.currentPage - 3;
      iMax = modelPagination.currentPage + 4;
    }
    while(i <= iMax) {
      pages += `<li class="${(currentPage === i)? 'page-item active': ''}">
                  <a class="page-link" href="#currencies" onclick="actions.changePage({v: ${i}})">${i}</a>
                </li> 
                `;
                i++;
    }

    pages += `<li class="${(currentPage === statePagination.nbPages)? 'page-item disabled' : ''}">
                <a class="page-link" href="#currencies" onclick="actions.changePage({v: ${(currentPage === statePagination.nbPages)? '' : currentPage + 1}})">&gt;</a>
              </li>
    
    `;

    let paginations = '';
    for(i = 0; i < modelPagination.rowsPerPage.length; i++) {
      paginations += `<option ${(modelPagination.rowsPerPage[i] === modelPagination.rowsPerPage[modelPagination.rowsPerPageIndex])? 'selected="selected"' : ''} value="${i}">${modelPagination.rowsPerPage[i]}</option>
      `;
    }

    return `
    <section id="pagination">
      <div class="row justify-content-center">
        <nav class="col-auto">
          <ul class="pagination">
            ${pages}
          </ul>
        </nav>
        <div class="col-auto">
          <div class="input-group mb-3">
            <select class="custom-select" id="selectTo" onchange="actions.changeLength({v: value})">
              ${paginations}
            </select>
            <div class="input-group-append">
              <span class="input-group-text">par page</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;

    /*return `
    <section id="pagination">
      <div class="row justify-content-center">
        <nav class="col-auto">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link" href="#currencies">&lt;</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#currencies">1</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#currencies">&gt;</a>
            </li>
          </ul>
        </nav>
        <div class="col-auto">
          <div class="input-group mb-3">
            <select class="custom-select" id="selectTo">
              <option value="0">5</option>
              <option selected="selected" value="1">10</option>
              <option value="2">15</option>
            </select>
            <div class="input-group-append">
              <span class="input-group-text">par page</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;*/
  },

  currenciesFiatsUI(model,state) {

    const paginationHTML = this.paginationUI(model, state, 'fiats');

    return `
    <div class="card border-secondary"
      id="currencies">
      <div class="card-header">
        <ul class="nav nav-pills card-header-tabs">
          <li class="nav-item">
            <a class="nav-link text-secondary" href="#currencies"
              onclick="actions.changeTab({tab:'currenciesCryptos'})"> Cryptos <span
                class="badge badge-secondary">10 / 386</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#currencies">Monnaies cibles <span
                class="badge badge-light">10 / 167</span></a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-append">
            <span class="input-group-text">Filtres : </span>
          </div>
          <input value="ro" id="filterText" type="text" class="form-control"
            placeholder="code ou nom..."/>
        </div> <br />
        <div>À compléter...</div><br />
        ${paginationHTML}
      </div>
      <div class="card-footer text-muted"> Monnaies préférées :
        <span class="badge badge-warning">CUP</span>
        <span class="badge badge-success">EUR</span>
        <span class="badge badge-warning">GBP</span>
        <span class="badge badge-warning">JEP</span>
        <span class="badge badge-warning">TTD</span>
        <span class="badge badge-warning">USD</span>
      </div>
    </div>
    `;
  },

  preferencesUI(model, state) {

    const authors        = model.config.authors;
    const debug          = model.config.debug;
    const activeTarget   = model.config.targets.active;
    const updateDisabled = model.config.dataMode == 'offline' ? 'disabled="disabled"' : '';
    const target         = model.config.targets.active;
    const targetsList    = mergeUnique(model.config.targets.list,[target]).sort();
    const fiatsList      = state.data.fiats.list;

    const fiatOptionsHTML = targetsList.map( (v) => {
      const code = fiatsList[v].code;
      const name = fiatsList[v].name;
      const isOffline = model.config.dataMode == 'offline';
      const selected = code == target ? 'selected="selected"' : '';
      const disabled = isOffline && code != target ? 'disabled="disabled"' : '';
      return `
      <option value="${code}" ${selected} ${disabled}>${code} - ${name}</option>
      `;
    }).join('\n');

    const dataModeOptionsHTML = [['online', 'En ligne'], ['offline', 'Hors ligne']].map( v => {
      const selected = v[0] == model.config.dataMode ? 'selected="selected"' : '';
      return `<option value="${v[0]}" ${selected}>${v[1]}</option>`;
    }).join('\n');

    return `
    <div class="card border-secondary">
      <div class="card-header d-flex justify-content-between">
        <h5 class=""> Préférences </h5>
        <h5 class="text-secondary"><abbr title="${authors}">Crédits</abbr></h5>
      </div>
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Monnaie
              cible</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01"
          onchange="actions.changeTarget({e:event, debug:'${debug}'})">
            ${fiatOptionsHTML}
          </select>
        </div>
        <p></p>
        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">Données</label>
          </div>
          <select class="custom-select" onchange="actions.changeDataMode({e:event, target:'${activeTarget}', debug:'${debug}'})">
            ${dataModeOptionsHTML}
          </select>
          <div class="input-group-append">
            <button class="btn btn-primary" ${updateDisabled}
            onclick="actions.updateOnlineCurrenciesData({target: '${activeTarget}', debug:'${debug}'})">
            Actualiser</button>
          </div>
        </div>
      </div>
    </div>
    `;
  },

  walletUI(model, state) {
    const tabName = model.ui.walletCard.selectedTab;
    switch (tabName) {
      case 'portfolio': return this.walletPortfolioUI(model, state); break;
      case 'ajouter'  : return this.walletAjouterUI  (model, state); break;
      default:
        console.error('view.currenciesUI() : unknown tab name: ', tabName);
        return '<p>Error in view.currenciesUI()</p>';
    }
  },

  walletPortfolioUI(model, state) {
    return `
    <div class="card border-secondary text-center" id="wallet">
      <div class="card-header">
        <ul class="nav nav-pills card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#wallet">Portfolio <span
                class="badge badge-light">3</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-secondary" href="#wallet"
              onclick="actions.changeTab({tab:'walletAjouter'})"> Ajouter <span
                class="badge badge-secondary">4</span></a>
          </li>
        </ul>
      </div>
      <div class="card-body text-center">
        <br />
        <div class="table-responsive">
          <table class="col-12 table table-sm table-bordered">
            <thead>
              <th class="align-middle text-center col-1"> Code </th>
              <th class="align-middle text-center col-4"> Nom </th>
              <th class="align-middle text-center col-2"> Prix </th>
              <th class="align-middle text-center col-3"> Qté </th>
              <th class="align-middle text-center col-2"> Total </th>
            </thead>
            <tr>
              <td class="text-center">
                <span class="badge badge-pill badge-light PortefolioMonnaie">
                  <img src="https://assets.coinlayer.com/icons/BTC.png" /> BTC
                </span></td>
              <td><b>Bitcoin</b></td>
              <td class="text-right">7885.74</td>
              <td class="text-right"><input type="text" onchange="actions.TotalPortefolio()" class="form-control PortefolioQte" value="2"/>
              </td>
              <td class="text-right"><span class=""><b class="PortefolioTotal">7885.74</b></span></td>
            </tr>
            <tr>
              <td class="text-center">
                <span class="badge badge-pill badge-light PortefolioMonnaie">
                  <img src="https://assets.coinlayer.com/icons/ETH.png" /> ETH
                </span></td>
              <td><b>Ethereum</b></td>
              <td class="text-right">168.21</td>
              <td class="text-right">
                <input type="text" onchange="actions.TotalPortefolio()" class="form-control text-primary PortefolioQte" value="13" />
              </td>
              <td class="text-right"><span
                  class="text-primary"><b class="PortefolioTotal">2186.79</b></span></td>
            </tr>
            <tr>
              <td class="text-center">
                <span class="badge badge-pill badge-light PortefolioMonnaie">
                  <img src="https://assets.coinlayer.com/icons/LTC.png" /> LTC
                </span></td>
              <td><b>Litecoin</b></td>
              <td class="text-right">54.04</td>
              <td class="text-right">
                <input type="text" onchange="actions.TotalPortefolio()" class="form-control text-primary PortefolioQte" value="21" />
              </td>
              <td class="text-right"><span
                  class="text-primary"><b class="PortefolioTotal">1134.81</b></span></td>
            </tr>
          </table>
        </div>
        <div class="input-group d-flex justify-content-end">
          <div class="input-group-prepend">
            <button class="btn btn-primary">Confirmer</button>
          </div>
          <div class="input-group-append">
            <button class="btn btn-secondary">Annuler</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <h3><span class="badge badge-primary" id="JeSuisTotal">Total : 11207.34 EUR</span></h3>
      </div>
    </div>
    `;
  },

  walletAjouterUI(model, state) {
    return `
    <div class="card border-secondary text-center" id="wallet">
      <div class="card-header">
        <ul class="nav nav-pills card-header-tabs">
          <li class="nav-item">
            <a class="nav-link text-secondary" href="#wallet"
              onclick="actions.changeTab({tab:'walletPortfolio'})"> Portfolio <span
                class="badge badge-secondary">3</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#wallet">Ajouter <span
                class="badge badge-light">4</span></a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <br />
        <div class="table-responsive">
          <table class="col-12 table table-sm table-bordered">
            <thead>
              <th class="align-middle text-center col-1"> Code </th>
              <th class="align-middle text-center col-4"> Nom </th>
              <th class="align-middle text-center col-2"> Prix </th>
              <th class="align-middle text-center col-3"> Qté </th>
              <th class="align-middle text-center col-2"> Total </th>
            </thead>
            <tr>
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/BCH.png" /> BCH
                </span></td>
              <td><b>Bitcoin Cash / BCC</b></td>
              <td class="text-right">253.44</td>
              <td class="text-right">
                <input type="text" class="form-control " value="0" />
              </td>
              <td class="text-right"><span class=""><b>0.00</b></span></td>
            </tr>
            <tr>
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/BTLC.png" /> BTLC
                </span></td>
              <td><b>BitLuckCoin</b></td>
              <td class="text-right">8.17</td>
              <td class="text-right">
                <input type="text" class="form-control text-primary" value="500" />
              </td>
              <td class="text-right"><span
                  class="text-primary"><b>4084.65</b></span></td>
            </tr>
            <tr>
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/DSH.png" /> DSH
                </span></td>
              <td><b>Dashcoin</b></td>
              <td class="text-right">228.86</td>
              <td class="text-right">
                <input type="text" class="form-control text-danger" value="-1" />
              </td>
              <td class="text-right"><span class="text-danger"><b>???</b></span>
              </td>
            </tr>
            <tr>
              <td class="text-center">
                <span class="badge badge-pill badge-light">
                  <img src="https://assets.coinlayer.com/icons/XMR.png" /> XMR
                </span></td>
              <td><b>Monero</b></td>
              <td class="text-right">59.57</td>
              <td class="text-right">
                <input type="text" class="form-control text-danger" value="plein!" />
              </td>
              <td class="text-right"><span class="text-danger"><b>???</b></span>
              </td>
            </tr>
          </table>
        </div>
        <div class="input-group d-flex justify-content-end">
          <div class="input-group-prepend">
            <button class="btn disabled">Confirmer</button>
          </div>
          <div class="input-group-append">
            <button class="btn btn-secondary">Annuler</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <h3><span class="badge badge-primary">Total : 4084.65 EUR</span></h3>
      </div>
    </div>
    `;
  },


};
