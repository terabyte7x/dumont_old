import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    // anac: Joi.string().required().min(6).max(6),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    admin: Joi.boolean(),
  }),
});
