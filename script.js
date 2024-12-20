function switchLanguage() {
    const langButton = document.getElementById('switch-lang');
    const isPortuguese = langButton.innerText === 'English';

    if (isPortuguese) {
        langButton.innerText = 'Português';
        document.getElementById('form-title').innerText = 'Resume Form';
        document.querySelector('label[for="nome"]').innerText = 'Full Name:';
        document.querySelector('label[for="celular"]').innerText = 'Phone with DDD:';
        document.querySelector('label[for="cidade"]').innerText = 'City:';
        document.querySelector('label[for="estado"]').innerText = 'State:';
        document.querySelector('label[for="email"]').innerText = 'E-mail:';
        document.querySelector('label[for="linkedin"]').innerText = 'LinkedIn Username:';
        document.querySelector('label[for="github"]').innerText = 'GitHub Username:';
        document.querySelector('label[for="portfolio"]').innerText = 'Portfolio Link:';
        document.querySelector('label[for="tituloCv"]').innerText = 'Resume Title:';
        document.querySelector('label[for="resumo"]').innerText = 'About You:';
        document.querySelectorAll('.section-title')[0].innerText = 'SKILLS';
        document.querySelector('label[for="hardskills"]').innerText = 'Hard Skills:';
        document.querySelector('label[for="softskills"]').innerText = 'Soft Skills:';
        document.querySelector('label[for="metodologias"]').innerText = 'Agile Methodologies:';
        document.querySelector('label[for="idiomas"]').innerText = 'Languages:';
        document.querySelectorAll('.section-title')[1].innerText = 'EDUCATION';
        document.querySelector('label[for="descricaoEdu"]').innerText = 'Description:';
        document.querySelector('label[for="instituicao"]').innerText = 'Institution:';
        document.querySelector('label[for="inicioEdu"]').innerText = 'Start Date (MM/YYYY):';
        document.querySelector('label[for="fimEdu"]').innerText = 'End Date (MM/YYYY):';
        document.querySelectorAll('.section-title')[2].innerText = 'PROJECTS & EXPERIENCE';
        document.querySelector('label[for="cargo"]').innerText = 'Position:';
        document.querySelector('label[for="empresa"]').innerText = 'Company:';
        document.querySelector('label[for="inicioExp"]').innerText = 'Start Date (MM/YYYY):';
        document.querySelector('label[for="fimExp"]').innerText = 'End Date (MM/YYYY):';
        document.querySelector('label[for="descExp"]').innerText = 'Description:';
        document.querySelector('button[type="button"]').innerText = 'Generate Resume';
    } else {
        langButton.innerText = 'English';
        document.getElementById('form-title').innerText = 'Formulário de Currículo';
        document.querySelector('label[for="nome"]').innerText = 'Nome Completo:';
        document.querySelector('label[for="celular"]').innerText = 'Celular com DDD:';
        document.querySelector('label[for="cidade"]').innerText = 'Cidade:';
        document.querySelector('label[for="estado"]').innerText = 'Estado:';
        document.querySelector('label[for="email"]').innerText = 'E-mail:';
        document.querySelector('label[for="linkedin"]').innerText = 'LinkedIn Username:';
        document.querySelector('label[for="github"]').innerText = 'GitHub Username:';
        document.querySelector('label[for="portfolio"]').innerText = 'Link Portfólio:';
        document.querySelector('label[for="tituloCv"]').innerText = 'Título do Currículo:';
        document.querySelector('label[for="resumo"]').innerText = 'Resumo sobre você:';
        document.querySelectorAll('.section-title')[0].innerText = 'HABILIDADES';
        document.querySelector('label[for="hardskills"]').innerText = 'HardSkills:';
        document.querySelector('label[for="softskills"]').innerText = 'SoftSkills:';
        document.querySelector('label[for="metodologias"]').innerText = 'Metodologias Ágeis:';
        document.querySelector('label[for="idiomas"]').innerText = 'Idiomas:';
        document.querySelectorAll('.section-title')[1].innerText = 'EDUCAÇÃO';
        document.querySelector('label[for="descricaoEdu"]').innerText = 'Descrição:';
        document.querySelector('label[for="instituicao"]').innerText = 'Instituição:';
        document.querySelector('label[for="inicioEdu"]').innerText = 'Mês/Ano de Início:';
        document.querySelector('label[for="fimEdu"]').innerText = 'Mês/Ano Final:';
        document.querySelectorAll('.section-title')[2].innerText = 'PROJETOS E EXPERIÊNCIAS';
        document.querySelector('label[for="cargo"]').innerText = 'Cargo:';
        document.querySelector('label[for="empresa"]').innerText = 'Empresa:';
        document.querySelector('label[for="inicioExp"]').innerText = 'Mês/Ano de Início:';
        document.querySelector('label[for="fimExp"]').innerText = 'Mês/Ano Final:';
        document.querySelector('label[for="descExp"]').innerText = 'Descrição:';
        document.querySelector('button[type="button"]').innerText = 'Gerar Currículo';
    }
}

function gerarCurriculo() {
    const titulo = document.getElementById('tituloCv').value;
    const nome = document.getElementById('nome').value;
    const celular = document.getElementById('celular').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const portfolio = document.getElementById('portfolio').value;
    const resumo = document.getElementById('resumo').value;
    const hardskills = document.getElementById('hardskills').value;
    const softskills = document.getElementById('softskills').value;
    const metodologias = document.getElementById('metodologias').value;
    const idiomas = document.getElementById('idiomas').value;
    const descricaoEdu = document.getElementById('descricaoEdu').value;
    const instituicao = document.getElementById('instituicao').value;
    const inicioEdu = document.getElementById('inicioEdu').value;
    const fimEdu = document.getElementById('fimEdu').value;
    const cargo = document.getElementById('cargo').value;
    const empresa = document.getElementById('empresa').value;
    const inicioExp = document.getElementById('inicioExp').value;
    const fimExp = document.getElementById('fimExp').value;
    const descExp = document.getElementById('descExp').value;

    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: [
                new docx.Paragraph({
                    text: titulo,
                    heading: docx.HeadingLevel.HEADING_1,
                }),
                new docx.Paragraph(`Nome: ${nome}`),
                new docx.Paragraph(`Celular: ${celular}`),
                new docx.Paragraph(`Cidade: ${cidade} - ${estado}`),
                new docx.Paragraph(`E-mail: ${email}`),
                new docx.Paragraph(`LinkedIn: https://linkedin.com/in/${linkedin}`),
                new docx.Paragraph(`GitHub: https://github.com/${github}`),
                new docx.Paragraph(`Portfólio: ${portfolio}`),
                new docx.Paragraph(`Resumo: ${resumo}`),
                new docx.Paragraph({
                    text: 'Habilidades',
                    heading: docx.HeadingLevel.HEADING_2,
                }),
                new docx.Paragraph(`HardSkills: ${hardskills}`),
                new docx.Paragraph(`SoftSkills: ${softskills}`),
                new docx.Paragraph(`Metodologias Ágeis: ${metodologias}`),
                new docx.Paragraph(`Idiomas: ${idiomas}`),
                new docx.Paragraph({
                    text: 'Educação',
                    heading: docx.HeadingLevel.HEADING_2,
                }),
                new docx.Paragraph(`Instituição: ${instituicao}`),
                new docx.Paragraph(`Início: ${inicioEdu} - Fim: ${fimEdu}`),
                new docx.Paragraph(`Descrição: ${descricaoEdu}`),
                new docx.Paragraph({
                    text: 'Projetos e Experiências',
                    heading: docx.HeadingLevel.HEADING_2,
                }),
                new docx.Paragraph(`Cargo: ${cargo}`),
                new docx.Paragraph(`Empresa: ${empresa}`),
                new docx.Paragraph(`Início: ${inicioExp} - Fim: ${fimExp}`),
                new docx.Paragraph(`Descrição: ${descExp}`),
            ],
        }],
    });

    docx.Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${titulo}.docx`);
    });
}
