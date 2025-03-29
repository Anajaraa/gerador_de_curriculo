let isDarkMode = false;
let currentLanguage = 'pt';

// Replace the existing LinkedIn and GitHub event listeners at the top of the file with:
document.getElementById('hasLinkedin').addEventListener('change', function() {
    const linkedinInput = document.getElementById('linkedin');
    if (this.checked) {
        linkedinInput.classList.remove('hidden');
    } else {
        linkedinInput.classList.add('hidden');
        linkedinInput.value = '';
    }
});

document.getElementById('hasGithub').addEventListener('change', function() {
    const githubInput = document.getElementById('github');
    if (this.checked) {
        githubInput.classList.remove('hidden');
    } else {
        githubInput.classList.add('hidden');
        githubInput.value = '';
    }
});

document.getElementById('profileImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
            preview.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
});

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.innerHTML = `<i class="fas fa-${isDarkMode ? 'sun' : 'moon'}"></i> ${isDarkMode ? 'Modo Claro' : 'Modo Escuro'}`;
}

function translateToEnglish() {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    const translateBtn = document.querySelector('.translate-btn');
    translateBtn.innerHTML = `<i class="fas fa-language"></i> ${currentLanguage === 'en' ? 'Traduzir para Português' : 'Translate to English'}`;

    const translations = {
        'pt': {
            'Informações Pessoais': 'Personal Information',
            'Nome Completo': 'Full Name',
            'Email': 'Email',
            'Telefone': 'Phone',
            'Endereço': 'Address',
            'Objetivo Profissional': 'Professional Objective',
            'Formação Acadêmica': 'Education',
            'Experiência Profissional': 'Professional Experience',
            'Curso': 'Course',
            'Instituição': 'Institution',
            'Período': 'Period',
            'Cargo': 'Position',
            'Empresa': 'Company',
            'Título da atividade': 'Activity title',
            'Descrição da atividade': 'Activity description',
            'Adicionar Formação': 'Add Education',
            'Adicionar Experiência': 'Add Experience',
            'Adicionar Atividade': 'Add Activity',
            'Selecione o idioma': 'Select language',
            'Nível': 'Level',
            'Iniciante': 'Beginner',
            'Intermediário': 'Intermediate',
            'Avançado': 'Advanced',
            'Fluente': 'Fluent',
            'Idiomas': 'Languages',
            'Hard Skills': 'Hard Skills',
            'Soft Skills': 'Soft Skills',
            'Adicionar Hard Skill': 'Add Hard Skill',
            'Adicionar Soft Skill': 'Add Soft Skill',
            'Atualizar Visualização': 'Update Preview',
            'Baixar Word': 'Download Word',
            'Possui LinkedIn?': 'Have LinkedIn?',
            'Possui GitHub?': 'Have GitHub?',
            'URL do LinkedIn': 'LinkedIn URL',
            'URL do GitHub': 'GitHub URL',
            'Gerador de Currículo': 'Resume Generator',
            'Modo Escuro': 'Dark Mode',
            'Modo Claro': 'Light Mode',
            'Remover': 'Remove',
            'Outro': 'Other',
            'Especifique o idioma': 'Specify language',
            'Descreva seu objetivo profissional': 'Describe your professional objective',
            'Adicionar Idioma': 'Add Language',
            'Inglês': 'English',
            'Espanhol': 'Spanish',
            'Adicione uma hard skill': 'Add a hard skill',
            'Adicione uma soft skill': 'Add a soft skill'
        }
    };
    translations.en = Object.fromEntries(
        Object.entries(translations.pt).map(([k, v]) => [v, k])
    );

    // Translate all elements in the form
    translateElements('h1, h2', translations);
    translateElements('label', translations);
    translateElements('button', translations);
    translatePlaceholders('input[placeholder], textarea[placeholder]', translations);
    translateOptions('select option', translations);

    // Translate preview content if it exists
    const previewContent = document.getElementById('preview');
    if (previewContent.innerHTML.trim() !== '') {
        translatePreviewContent(previewContent, translations);
    }
}

function translateElements(selector, translations) {
    document.querySelectorAll(selector).forEach(element => {
        const currentText = element.textContent.trim();
        if (currentText) {
            const translation = currentLanguage === 'en' ? 
                translations.pt[currentText] || currentText :
                translations.en[currentText] || currentText;
            if (translation !== currentText) {
                element.innerHTML = element.innerHTML.replace(currentText, translation);
            }
        }
    });
}

function translatePlaceholders(selector, translations) {
    document.querySelectorAll(selector).forEach(element => {
        const currentPlaceholder = element.getAttribute('placeholder');
        if (currentPlaceholder) {
            const translation = currentLanguage === 'en' ? 
                translations.pt[currentPlaceholder] || currentPlaceholder :
                translations.en[currentPlaceholder] || currentPlaceholder;
            element.setAttribute('placeholder', translation);
        }
    });
}

function translateOptions(selector, translations) {
    document.querySelectorAll(selector).forEach(option => {
        const currentText = option.text.trim();
        if (currentText && currentText !== '') {
            const translation = currentLanguage === 'en' ? 
                translations.pt[currentText] || currentText :
                translations.en[currentText] || currentText;
            option.text = translation;
        }
    });
}

function translatePreviewContent(preview, translations) {
    const elements = preview.querySelectorAll('h1, h2, p, li, span');
    elements.forEach(element => {
        const currentText = element.textContent.trim();
        if (currentText) {
            const translation = currentLanguage === 'en' ? 
                translations.pt[currentText] || currentText :
                translations.en[currentText] || currentText;
            if (translation !== currentText) {
                element.textContent = translation;
            }
        }
    });
}

function toggleOutroIdioma(select) {
    const outroInput = select.nextElementSibling;
    outroInput.classList.toggle('hidden', select.value !== 'outro');
}

function adicionarIdioma() {
    const container = document.getElementById('idiomas-container');
    const div = document.createElement('div');
    div.className = 'idioma-item';
    div.innerHTML = `
        <select class="idioma-select" onchange="toggleOutroIdioma(this)">
            <option value="">${currentLanguage === 'en' ? 'Select language' : 'Selecione o idioma'}</option>
            <option value="ingles">${currentLanguage === 'en' ? 'English' : 'Inglês'}</option>
            <option value="espanhol">${currentLanguage === 'en' ? 'Spanish' : 'Espanhol'}</option>
            <option value="outro">${currentLanguage === 'en' ? 'Other' : 'Outro'}</option>
        </select>
        <input type="text" class="outro-idioma hidden" placeholder="${currentLanguage === 'en' ? 'Specify language' : 'Especifique o idioma'}">
        <select class="nivel-select">
            <option value="">${currentLanguage === 'en' ? 'Level' : 'Nível'}</option>
            <option value="iniciante">${currentLanguage === 'en' ? 'Beginner' : 'Iniciante'}</option>
            <option value="intermediario">${currentLanguage === 'en' ? 'Intermediate' : 'Intermediário'}</option>
            <option value="avancado">${currentLanguage === 'en' ? 'Advanced' : 'Avançado'}</option>
            <option value="fluente">${currentLanguage === 'en' ? 'Fluent' : 'Fluente'}</option>
        </select>
        <button type="button" onclick="removerItem(this)" class="remove-btn">
            <i class="fas fa-trash"></i> ${currentLanguage === 'en' ? 'Remove' : 'Remover'}
        </button>
    `;
    container.appendChild(div);
}

function adicionarEducacao() {
    const container = document.getElementById('educacao-container');
    const div = document.createElement('div');
    div.className = 'educacao-item';
    div.innerHTML = `
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Course' : 'Curso'}">
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Institution' : 'Instituição'}">
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Period' : 'Período'}">
        <button type="button" onclick="removerItem(this)" class="remove-btn">
            <i class="fas fa-trash"></i> ${currentLanguage === 'en' ? 'Remove' : 'Remover'}
        </button>
    `;
    container.appendChild(div);
}

function adicionarExperiencia() {
    const container = document.getElementById('experiencia-container');
    const div = document.createElement('div');
    div.className = 'experiencia-item';
    div.innerHTML = `
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Position' : 'Cargo'}">
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Company' : 'Empresa'}">
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Period' : 'Período'}">
        <div class="atividades-container">
            <div class="atividade-item">
                <input type="text" placeholder="${currentLanguage === 'en' ? 'Activity title' : 'Título da atividade'}">
                <textarea placeholder="${currentLanguage === 'en' ? 'Activity description' : 'Descrição da atividade'}"></textarea>
            </div>
        </div>
        <button type="button" onclick="adicionarAtividade(this)" class="add-btn">
            <i class="fas fa-plus"></i> ${currentLanguage === 'en' ? 'Add Activity' : 'Adicionar Atividade'}
        </button>
        <button type="button" onclick="removerItem(this)" class="remove-btn">
            <i class="fas fa-trash"></i> ${currentLanguage === 'en' ? 'Remove' : 'Remover'}
        </button>
    `;
    container.appendChild(div);
}

function adicionarAtividade(btn) {
    const container = btn.previousElementSibling;
    const div = document.createElement('div');
    div.className = 'atividade-item';
    div.innerHTML = `
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Activity title' : 'Título da atividade'}">
        <textarea placeholder="${currentLanguage === 'en' ? 'Activity description' : 'Descrição da atividade'}"></textarea>
        <button type="button" onclick="removerItem(this)" class="remove-btn">
            <i class="fas fa-trash"></i> ${currentLanguage === 'en' ? 'Remove' : 'Remover'}
        </button>
    `;
    container.appendChild(div);
}

function adicionarHardSkill() {
    const container = document.getElementById('hardskills-container');
    const div = document.createElement('div');
    div.className = 'skill-input';
    div.innerHTML = `
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Add a hard skill' : 'Adicione uma hard skill'}">
        <button type="button" onclick="removerItem(this)" class="remove-btn">
            <i class="fas fa-trash"></i> ${currentLanguage === 'en' ? 'Remove' : 'Remover'}
        </button>
    `;
    container.appendChild(div);
}

function adicionarSoftSkill() {
    const container = document.getElementById('softskills-container');
    const div = document.createElement('div');
    div.className = 'skill-input';
    div.innerHTML = `
        <input type="text" placeholder="${currentLanguage === 'en' ? 'Add a soft skill' : 'Adicione uma soft skill'}">
        <button type="button" onclick="removerItem(this)" class="remove-btn">
            <i class="fas fa-trash"></i> ${currentLanguage === 'en' ? 'Remove' : 'Remover'}
        </button>
    `;
    container.appendChild(div);
}

function removerItem(btn) {
    btn.closest('.idioma-item, .educacao-item, .experiencia-item, .atividade-item, .skill-input').remove();
}

document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    gerarCurriculo();
});

function gerarCurriculo() {
    const preview = document.getElementById('preview');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const objetivo = document.getElementById('objetivo').value;
    const profileImage = document.getElementById('imagePreview').innerHTML;
    
    // Get LinkedIn and GitHub URLs
    const linkedinUrl = document.getElementById('linkedin').value;
    const githubUrl = document.getElementById('github').value;
    const hasLinkedin = document.getElementById('hasLinkedin').checked;
    const hasGithub = document.getElementById('hasGithub').checked;

    // Build social links HTML
    let socialLinksHtml = '';
    if (hasLinkedin && linkedinUrl) {
        socialLinksHtml += `<li><a href="${linkedinUrl}" target="_blank"><i class="fab fa-linkedin"></i> ${linkedinUrl}</a></li>`;
    }
    if (hasGithub && githubUrl) {
        socialLinksHtml += `<li><a href="${githubUrl}" target="_blank"><i class="fab fa-github"></i> ${githubUrl}</a></li>`;
    }

    // Get languages
    const idiomas = [];
    document.querySelectorAll('.idioma-item').forEach(item => {
        const select = item.querySelector('.idioma-select');
        const outroInput = item.querySelector('.outro-idioma');
        const nivel = item.querySelector('.nivel-select').value;
        const idioma = select.value === 'outro' ? outroInput.value : select.options[select.selectedIndex].text;
        if (idioma && nivel) {
            idiomas.push(`${idioma} - ${nivel}`);
        }
    });

    // Get education
    const educacao = [];
    document.querySelectorAll('.educacao-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value && inputs[1].value) {
            educacao.push(`
                <div class="educacao">
                    <div class="curso">${inputs[0].value}</div>
                    <div class="instituicao">${inputs[1].value}</div>
                    <div class="periodo">${inputs[2].value}</div>
                </div>
            `);
        }
    });

    // Get experience
    const experiencias = [];
    document.querySelectorAll('.experiencia-item').forEach(item => {
        const cargo = item.querySelector('input[placeholder*="Cargo"]').value;
        const empresa = item.querySelector('input[placeholder*="Empresa"]').value;
        const periodo = item.querySelector('input[placeholder*="Período"]').value;
        
        const atividades = [];
        item.querySelectorAll('.atividade-item').forEach(atv => {
            const titulo = atv.querySelector('input').value;
            const descricao = atv.querySelector('textarea').value;
            if (titulo || descricao) {
                atividades.push(`
                    <li>
                        <div class="atividade-titulo">${titulo}</div>
                        <div>${descricao}</div>
                    </li>
                `);
            }
        });

        if (cargo && empresa) {
            experiencias.push(`
                <div class="experiencia">
                    <div class="cargo">${cargo}</div>
                    <div class="empresa">${empresa}</div>
                    <div class="periodo">${periodo}</div>
                    ${atividades.length ? `<ul class="atividades-list">${atividades.join('')}</ul>` : ''}
                </div>
            `);
        }
    });

    // Get skills
    const hardSkills = [];
    document.querySelectorAll('#hardskills-container input').forEach(input => {
        if (input.value) hardSkills.push(input.value);
    });

    const softSkills = [];
    document.querySelectorAll('#softskills-container input').forEach(input => {
        if (input.value) softSkills.push(input.value);
    });

    // Build the resume HTML
    preview.innerHTML = `
        <div class="resume-content">
            ${profileImage}
            <h1>${nome}</h1>
            
            <div class="contact-info">
                <span><i class="fas fa-envelope"></i> ${email}</span>
                <span><i class="fas fa-phone"></i> ${telefone}</span>
                ${endereco ? `<span><i class="fas fa-map-marker-alt"></i> ${endereco}</span>` : ''}
            </div>

            ${socialLinksHtml ? `<div class="social-links">${socialLinksHtml}</div>` : ''}

            ${objetivo ? `
                <h2>${currentLanguage === 'en' ? 'Professional Objective' : 'Objetivo Profissional'}</h2>
                <p>${objetivo}</p>
            ` : ''}

            ${idiomas.length ? `
                <h2>${currentLanguage === 'en' ? 'Languages' : 'Idiomas'}</h2>
                <ul class="skills-list">
                    ${idiomas.map(idioma => `<li>${idioma}</li>`).join('')}
                </ul>
            ` : ''}

            ${educacao.length ? `
                <h2>${currentLanguage === 'en' ? 'Education' : 'Formação Acadêmica'}</h2>
                ${educacao.join('')}
            ` : ''}

            ${experiencias.length ? `
                <h2>${currentLanguage === 'en' ? 'Professional Experience' : 'Experiência Profissional'}</h2>
                ${experiencias.join('')}
            ` : ''}

            ${hardSkills.length ? `
                <h2>Hard Skills</h2>
                <ul class="skills-list">
                    ${hardSkills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            ` : ''}

            ${softSkills.length ? `
                <h2>Soft Skills</h2>
                <ul class="skills-list">
                    ${softSkills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `;
}

function exportToWord() {
    const previewContent = document.getElementById('preview').innerHTML;
    const styles = `
        <style>
            body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            h1 { color: #2196F3; border-bottom: 2px solid #2196F3; padding-bottom: 10px; }
            h2 { color: #2196F3; margin: 20px 0 10px; }
            .contact-info { margin: 15px 0; }
            .contact-info span { margin-right: 15px; }
            .social-links { margin: 10px 0; }
            .social-links a { color: #2196F3; text-decoration: none; margin-right: 15px; }
            .educacao, .experiencia { margin: 15px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
            .periodo { color: #666; font-style: italic; margin: 5px 0; }
            .cargo, .curso { font-weight: 600; }
            .empresa, .instituicao { color: #2196F3; font-weight: 500; }
            .skills-list { margin-left: 20px; margin-bottom: 15px; }
            .atividade-titulo { font-weight: bold; margin-bottom: 5px; }
            img { width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 20px; display: block; }
        </style>
    `;

    const blob = new Blob([`
        <html>
            <head>
                <meta charset="UTF-8">
                ${styles}
            </head>
            <body>
                ${previewContent}
            </body>
        </html>
    `], { type: 'application/msword' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'curriculo.doc';
    link.click();
}