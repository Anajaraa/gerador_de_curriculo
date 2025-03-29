document.getElementById('hasLinkedin').addEventListener('change', function() {
    document.getElementById('linkedin').classList.toggle('hidden');
});

document.getElementById('hasGithub').addEventListener('change', function() {
    document.getElementById('github').classList.toggle('hidden');
});

function adicionarEducacao() {
    const container = document.getElementById('educacao-container');
    const div = document.createElement('div');
    div.className = 'educacao-item';
    div.innerHTML = `
        <input type="text" placeholder="Curso">
        <input type="text" placeholder="Instituição">
        <input type="text" placeholder="Período">
        <button type="button" onclick="this.parentElement.remove()" class="remove-btn">
            <i class="fas fa-trash"></i> Remover
        </button>
    `;
    container.appendChild(div);
}

function adicionarExperiencia() {
    const container = document.getElementById('experiencia-container');
    const div = document.createElement('div');
    div.className = 'experiencia-item';
    div.innerHTML = `
        <input type="text" placeholder="Cargo">
        <input type="text" placeholder="Empresa">
        <input type="text" placeholder="Período">
        <textarea placeholder="Descrição das atividades"></textarea>
        <button type="button" onclick="this.parentElement.remove()" class="remove-btn">
            <i class="fas fa-trash"></i> Remover
        </button>
    `;
    container.appendChild(div);
}

function exportToWord() {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + document.getElementById("preview").innerHTML + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'curriculo.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const preview = document.getElementById('preview');
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const objetivo = document.getElementById('objetivo').value;
    const linkedin = document.getElementById('hasLinkedin').checked ? document.getElementById('linkedin').value : '';
    const github = document.getElementById('hasGithub').checked ? document.getElementById('github').value : '';
    
    let html = `
        <div class="resume-content">
            <h1>${nome}</h1>
            <div class="contact-info">
                <p><i class="fas fa-envelope"></i> ${email}</p>
                <p><i class="fas fa-phone"></i> ${telefone}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${endereco}</p>
            </div>
    `;

    if (linkedin || github) {
        html += '<div class="social-links">';
        if (linkedin) html += `<a href="${linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>`;
        if (github) html += `<a href="${github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>`;
        html += '</div>';
    }
    
    html += `
        <h2><i class="fas fa-bullseye"></i> Objetivo Profissional</h2>
        <p>${objetivo}</p>
        
        <h2><i class="fas fa-graduation-cap"></i> Formação Acadêmica</h2>
    `;
    
    const educacaoItems = document.querySelectorAll('.educacao-item');
    educacaoItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value) {
            html += `
                <div class="educacao">
                    <h3>${inputs[0].value}</h3>
                    <p>${inputs[1].value}</p>
                    <p><i class="far fa-calendar-alt"></i> ${inputs[2].value}</p>
                </div>
            `;
        }
    });
    
    html += '<h2><i class="fas fa-briefcase"></i> Experiência Profissional</h2>';
    
    const experienciaItems = document.querySelectorAll('.experiencia-item');
    experienciaItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const descricao = item.querySelector('textarea').value;
        if (inputs[0].value) {
            html += `
                <div class="experiencia">
                    <h3>${inputs[0].value}</h3>
                    <p><strong>${inputs[1].value}</strong> - ${inputs[2].value}</p>
                    <p>${descricao}</p>
                </div>
            `;
        }
    });

    html += '</div>';
    preview.innerHTML = html;
});