export function render(container) {
  container.innerHTML = `
    <section class="panel">
      <div class="details-header">
        <h3>Bem-vindo ao Relicário DeusOt</h3>
      </div>
      <div class="details-body">
        <p class="lead">
          Use o menu lateral para navegar entre as seções do servidor.
        </p>
      </div>
    </section>
  `;
}

export default { render };
