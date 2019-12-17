
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
      change += (element.change > 0)? ' ↗' : (element.change === 0)? ' ∼' : ' ↘';

      dataHTML += `
        <tr class="${dataClass}" onclick="actions.changeStatus({id: '${element.code}'})">
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

    let favorite = keys.map(x => {
      if(coins[x].quantity === 0) {
        return `<span class="badge badge-warning">${x}</span>`;
      } else {
        return `<span class="badge badge-success">${x}</span>`;
      }
    }).join(' ');


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
              <span class="badge badge-secondary">${state.data.fiats.filteredNum} / ${state.data.fiats.listNum}</span></a>
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
  },

  currenciesFiatsUI(model,state) {

    const paginationHTML = this.paginationUI(model, state, 'fiats');


    let target = model.config.targets;
    let favorite = target.list.sort().map(element => {
      return (element === target.active)? `<span class="badge badge-success">${element}</span>` : `<span class="badge badge-warning">${element}</span>`;
    }).join(' ');

    let list = state.data.fiats.filtered;
    let pagination = model.ui.currenciesCard.tabs.fiats.pagination;
    let pageLength = pagination.rowsPerPage[pagination.rowsPerPageIndex];
    let dataHTML = '';
    let i = pagination.currentPage * pageLength - pageLength;
    if (i < 0) i = 0;
    while (i < pageLength * pagination.currentPage && i < list.length) {
      let element = list[i];
      console.log(i, element);
      let dataClass = ''; 
      let target = model.config.targets;
      pos = target.list.indexOf(element.code);
      if (pos !== -1) {
        if (model.config.targets.active === element.code) {
          dataClass = 'bg-success text-light';
        } else {
          dataClass = 'bg-warning';
        }
      }

      dataHTML += `
        <tr class="${dataClass}" onclick="actions.changeStatus({id: '${element.code}'})">
          <td class="text-center">
            <span class="badge-pill">
              ${element.code}
            </span></td>
          <td><b>${element.name}</b></td>
          <td class="text-center">${element.symbol}</td>
        </tr>
      `
      i++;
    }


    return `
    <div class="card border-secondary"
      id="currencies">
      <div class="card-header">
        <ul class="nav nav-pills card-header-tabs">
          <li class="nav-item">
            <a class="nav-link text-secondary" href="#currencies"
              onclick="actions.changeTab({tab:'currenciesCryptos'})"> Cryptos <span
                class="badge badge-secondary">${state.data.cryptos.filteredNum} / ${state.data.cryptos.listNum}</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#currencies">Monnaies cibles <span
                class="badge badge-light">${state.data.fiats.filteredNum} / ${state.data.fiats.listNum}</span></a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-append">
            <span class="input-group-text">Filtres : </span>
          </div>
          <input value="${model.ui.currenciesCard.tabs.fiats.filters.text}" id="filterText" type="text" class="form-control"
            placeholder="code ou nom..." onchange="actions.changeFilterTab({value: value, id:'text'})"/>
        </div> <br />
        <div>
        <table class="col-12 table table-sm table-bordered">
        <thead>
          <th class="align-middle text-center col-2">
            <a href="#currencies" onclick="actions.changeSort({id: 'code'})">Code</a>
          </th>
          <th class="align-middle text-center col-4">
            <a href="#currencies" onclick="actions.changeSort({id: 'name'})">Nom</a>
          </th>
          <th class="align-middle text-center col-2">
            <a href="#currencies" onclick="actions.changeSort({id: 'symbol'})">Symbole</a>
          </th>
        </thead>
        ${dataHTML}
      </table>
        </div>
        ${paginationHTML}
      </div>
      <div class="card-footer text-muted"> Monnaies préférées :
        ${favorite}
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
    let i;
    let tab = state.data.coins.posValueCodes;
    let list = state.data.cryptos.list;
    let html = '';
    let qte = 0;
    let element;
    let total = 0;
    let produit;

    for (i = 0 ; i < tab.length ; i++)
    {
      qte = model.config.coins[tab[i]].quantity;
      element = tab[i];
      produit = isNaN(qte) ? qte : 0 * list[element].price;
      total += produit;
      html += `
      <tr>
      <td class="text-center">
        <span class="badge badge-pill badge-light PortefolioMonnaie">
          <img src="${list[element].icon_url}"/> ${list[element].code}
        </span></td>
      <td><b>${list[element].name}</b></td>
      <td class="text-right ${isNaN(qte) ? "text-danger" : ""}">${list[element].price.toFixed(2)}</td>
      <td class="text-right"><input type="text" onchange="actions.TotalPortefolio({name : '${element}' , qte : ${qte}})" class="form-control" value="${qte}"/>
      </td>
      <td class="text-right"><span class=""><b class="PortefolioTotal">${produit}</b></span></td>
      </tr>
      `;
    }



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
            ${html}
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
        <h3><span class="badge badge-primary" id="JeSuisTotal">Total : ${total.toFixed(2)} ${model.config.targets.active}</span></h3>
      </div>
    </div>
    `;
  },

  walletAjouterUI(model, state) {
    let coins = model.config.coins;
    let stateCoins = state.data.coins;
    let list = state.data.cryptos.list;

    let dataHTML = '';
    let verif = true;
    let valid = true;
    let total = 0;
    stateCoins.nullValueCodes.forEach(element => {
      if (parseInt(coins[element].quantityNew) !== coins[element].quantity) valid = false;
      let value;
      if (isNaN(coins[element].quantityNew) || coins[element].quantityNew < 0) {
        value = '???';
        verif = false;
      } else {
        value = (coins[element].quantityNew * list[element].price).toFixed(2);
        total += coins[element].quantityNew * list[element].price;
      }
      dataHTML += `
      <tr>
        <td class="text-center">
          <span class="badge badge-pill badge-light">
            <img src="${list[element].icon_url}" /> ${list[element].code}
          </span></td>
        <td><b>${list[element].name}</b></td>
        <td class="text-right">${list[element].price.toFixed(2)}</td>
        <td class="text-right">
          <input type="text" class="form-control ${(isNaN(value))? 'text-danger' : (value > 0)? 'text-primary' : ''}" value="${(coins[element].quantityNew === '')? '0' : coins[element].quantityNew}" onchange="actions.updateValues({v: value, id: '${element}'})"/>
        </td>
        <td class="text-right"><span class="${(isNaN(value))? 'text-danger' : (value > 0)? 'text-primary' : ''}"><b>${value}</b></span></td>
      </tr>
      `;
    });

    return `
    <div class="card border-secondary text-center" id="wallet">
    <div class="card-header">
      <ul class="nav nav-pills card-header-tabs">
        <li class="nav-item">
          <a class="nav-link text-secondary" href="#wallet"
            onclick="actions.changeTab({tab:'walletPortfolio'})"> Portfolio <span
              class="badge badge-secondary">${stateCoins.posValueCodes.length}</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#wallet">Ajouter <span
              class="badge badge-light">${stateCoins.nullValueCodes.length}</span></a>
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
          ${dataHTML}
        </table>
      </div>
      <div class="input-group d-flex justify-content-end">
        <div class="input-group-prepend">
          <button class=" btn ${verif && !valid? 'btn-primary' : 'disabled'}" onclick="actions.updateCoins()">Confirmer</button>
        </div>
        <div class="input-group-append">
          <button class="btn ${!valid? 'btn-secondary' : 'disabled'}" onclick="actions.resetWallet()">Annuler</button>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <h3><span class="badge ${valid? 'badge-success' : 'badge-primary'}">Total : ${total.toFixed(2)} ${model.config.targets.active}</span></h3>
    </div>
  </div>
    `;
  },


};
