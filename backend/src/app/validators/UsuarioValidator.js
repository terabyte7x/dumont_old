import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    codigo_anac: Joi.string().required().min(6).max(6),
    email: Joi.string().required().email(),
    senha: Joi.string().required().min(8),
  }),
});
