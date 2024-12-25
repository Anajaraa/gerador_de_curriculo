function switchLanguage() {
    const langButton = document.getElementById('switch-lang');
    const isPortuguese = langButton.innerText === 'English';

    langButton.innerText = isPortuguese ? 'Português' : 'English';
    document.getElementById('form-title').innerText = isPortuguese ? 'Resume Form' : 'Formulário de Currículo';

    const labels = {
        nome: ['Full Name:', 'Nome Completo:'],
        endereco: ['Address:', 'Endereço:'],
        telefone: ['Phone:', 'Telefone:'],
        email: ['Email:', 'E-mail:'],
        objetivo: ['Professional Objective:', 'Objetivo Profissional:'],
        'hard-skills': ['Hard Skills:', 'Hard Skills:'],
        'soft-skills': ['Soft Skills:', 'Soft Skills:'],
        idiomas: ['Languages:', 'Idiomas:'],
        instituicao: ['Institution:', 'Instituição:'],
        curso: ['Course:', 'Curso:'],
        'inicio-edu': ['Start Year:', 'Ano de Início:'],
        'fim-edu': ['End Year:', 'Ano de Conclusão:'],
        cargo: ['Job Title:', 'Cargo:'],
        empresa: ['Company:', 'Empresa:'],
        'inicio-exp': ['Start Year:', 'Ano de Início:'],
        'fim-exp': ['End Year:', 'Ano de Conclusão:'],
        'desc-exp': ['Description of Activities:', 'Descrição das Atividades:'],
        'curso-nome': ['Course/Certification Name:', 'Nome do Curso/Certificação:'],
        'instituicao-curso': ['Institution:', 'Instituição:'],
        'ano-curso': ['Completion Year:', 'Ano de Conclusão:']
    };

    for (const [id, texts] of Object.entries(labels)) {
        const element = document.querySelector(`label[for="${id}"]`);
        if (element) {
            element.innerText = isPortuguese ? texts[0] : texts[1];
        }
    }

    document.querySelector('button[onclick="gerarCurriculo()"').innerText = isPortuguese ? 'Save and Download Resume' : 'Salvar e Baixar Currículo';
}

function gerarCurriculo() {
    if (!validarCampos()) {
        alert('Por favor, preencha todos os campos obrigatórios antes de gerar o currículo.');
        return;
    }

    const doc = new docx.Document({
        sections: [{
            children: gerarConteudo(),
        }],
    });

    docx.Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${document.getElementById('nome').value}_Curriculo.docx`);
    });
}

function validarCampos() {
    const camposObrigatorios = [
        'nome', 'endereco', 'telefone', 'email', 'objetivo', 'hard-skills', 'soft-skills', 'idiomas'
    ];

    for (const id of camposObrigatorios) {
        const campo = document.getElementById(id);
        if (!campo || campo.value.trim() === '') {
            campo.focus();
            return false;
        }
    }
    return true;
}

function gerarConteudo() {
    const conteudo = [];

    // Informações pessoais
    const infoPessoal = ['nome', 'endereco', 'telefone', 'email'];
    infoPessoal.forEach(id => {
        conteudo.push(new docx.Paragraph(`${id.charAt(0).toUpperCase() + id.slice(1)}: ${document.getElementById(id).value}`));
    });

    // Objetivo profissional
    conteudo.push(new docx.Paragraph({ text: 'Objetivo Profissional:', heading: docx.HeadingLevel.HEADING_2 }));
    conteudo.push(new docx.Paragraph(document.getElementById('objetivo').value));

    // Habilidades
    conteudo.push(new docx.Paragraph({ text: 'Habilidades:', heading: docx.HeadingLevel.HEADING_2 }));
    conteudo.push(new docx.Paragraph(`Hard Skills: ${document.getElementById('hard-skills').value}`));
    conteudo.push(new docx.Paragraph(`Soft Skills: ${document.getElementById('soft-skills').value}`));

    // Idiomas
    conteudo.push(new docx.Paragraph({ text: 'Idiomas:', heading: docx.HeadingLevel.HEADING_2 }));
    conteudo.push(new docx.Paragraph(document.getElementById('idiomas').value));

    // Formação acadêmica
    document.querySelectorAll('.edu-item').forEach(edu => {
        conteudo.push(new docx.Paragraph({ text: 'Formação Acadêmica:', heading: docx.HeadingLevel.HEADING_2 }));
        conteudo.push(new docx.Paragraph(
            `Instituição: ${edu.querySelector('.instituicao').value}, Curso: ${edu.querySelector('.curso').value}, Início: ${edu.querySelector('.inicio-edu').value}, Fim: ${edu.querySelector('.fim-edu').value}`
        ));
    });

    // Experiência profissional
    document.querySelectorAll('.exp-item').forEach(exp => {
        conteudo.push(new docx.Paragraph({ text: 'Experiência Profissional:', heading: docx.HeadingLevel.HEADING_2 }));
        conteudo.push(new docx.Paragraph(
            `Cargo: ${exp.querySelector('.cargo').value}, Empresa: ${exp.querySelector('.empresa').value}, Início: ${exp.querySelector('.inicio-exp').value}, Fim: ${exp.querySelector('.fim-exp').value}, Descrição: ${exp.querySelector('.desc-exp').value}`
        ));
    });

    // Cursos e Certificações
    document.querySelectorAll('.curso-item').forEach(curso => {
        conteudo.push(new docx.Paragraph({ text: 'Cursos e Certificações:', heading: docx.HeadingLevel.HEADING_2 }));
        conteudo.push(new docx.Paragraph(
            `Nome: ${curso.querySelector('.curso-nome').value}, Instituição: ${curso.querySelector('.instituicao-curso').value}, Ano: ${curso.querySelector('.ano-curso').value}`
        ));
    });

    return conteudo;
}

document.getElementById('add-edu').onclick = () => adicionarItem('educacao-section', 'edu-item');
document.getElementById('add-exp').onclick = () => adicionarItem('experiencia-section', 'exp-item');
document.getElementById('add-curso').onclick = () => adicionarItem('cursos-section', 'curso-item');

function adicionarItem(seletor, classe) {
    const container = document.getElementById(seletor);
    if (!container) {
        console.error(`Container ${seletor} não encontrado.`);
        return;
    }

    const templateItem = container.querySelector(`.${classe}`);
    if (!templateItem) {
        console.error(`Template de item ${classe} não encontrado.`);
        return;
    }

    const item = document.createElement('div');
    item.classList.add(classe);
    item.innerHTML = templateItem.innerHTML;
    container.appendChild(item);
}
