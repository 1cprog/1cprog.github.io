const PaginatorView = Backbone.View.extend({
  el: $('.page-list'),

  render(params) {
    const listElement = document.createElement('li');
    listElement.classList.add('page-list-item');
    const link = document.createElement('a');
    link.classList.add('page-index');
    link.href = `#${params.pageId}`;
    link.textContent = params.pageId;
    listElement.appendChild(link);
    this.el.append(listElement);
  }
})