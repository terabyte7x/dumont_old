import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  options: { attempts: 3 },
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: 'Centro de Instrução Dumont <noreply@dumont.systems>',
      to: `${user.name} <${user.email}>`,
      subject: `Seja bem vindo ao Dumont!`,
      html: `Olá, Tripulante ${user.name}. Bem-vindo ao sistema mais avançado do mundo.`,
    });
  },
};
