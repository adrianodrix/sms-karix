import api from './api';

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.querySelector('#repo-form');
    this.listEl = document.querySelector('#repo-list');
    this.inputEl = document.querySelector('#repo-form > input[name="repository"]'); 
    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  setLoading(loading = true) {
    if (loading === true) {
      let imgLoadingEl = document.createElement('img');
      imgLoadingEl.setAttribute('src', 'https://loading.io/spinners/color-bar/index.colorful-progress-loader.svg');

      let loadingEl = document.createElement('span');
      loadingEl.appendChild(imgLoadingEl);
      loadingEl.setAttribute('id', 'loading');

      this.formEl.appendChild(loadingEl);
    } else {
      document.querySelector('#loading').remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;
    
    if (repoInput.length === 0) return;

    try {
      this.setLoading();

      const response = await api.get(`/repos/${repoInput}`);

      const {name, description, html_url, owner: {avatar_url}} = response.data;
      
      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url,
      });
      
      this.inputEl.value = '';

      this.render();
    } catch (err) {
      console.error("Error response:");
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      alert(err.response.data.message);
    } finally {
      this.setLoading(false);
    }    
  }

  render() {
    this.listEl.innerHTML = '';

    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);
      
      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement('p');
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));
      
      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}

new App();