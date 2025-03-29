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

async function downloadPDF() {
    const element = document.getElementById('preview');
    const downloadBtn = document.querySelector('.download-btn');
    
    // Configure PDF options
    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'curriculo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        }
    };

    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';
    downloadBtn.disabled = true;

    try {
        // Create a clone of the preview element
        const clone = element.cloneNode(true);
        clone.style.width = '210mm'; // A4 width
        document.body.appendChild(clone);
        
        // Generate PDF
        await html2pdf().set(opt).from(clone).save();
        
        // Remove clone
        document.body.removeChild(clone);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
        // Restore button state
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar PDF';
        downloadBtn.disabled = false;
    }
}

document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const preview = document.getElementById('preview');
    
    // Collect form data
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const objetivo = document.getElementById('objetivo').value;
    const linkedin = document.getElementById('hasLinkedin').checked ? document.getElementById('linkedin').value : '';
    const github = document.getElementById('hasGithub').checked ? document.getElementById('github').value : '';
    
    // Generate resume HTML
    let html = `
        <div class="resume-content">
            <h1>${nome}</h1>
            <div class="contact-info">
                <p><i class="fas fa-envelope"></i> ${email}</p>
                <p><i class="fas fa-phone"></i> ${telefone}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${endereco}</p>
            </div>
    `;

    // Add social media links if provided
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
    
    // Add education
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
    
    // Add work experience
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