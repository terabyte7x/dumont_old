/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import AccessControl from 'accesscontrol';
import User from '../models/User';

const ac = new AccessControl();
// Define users permission
// ac.grant('').createAny([]).readAny([]).updateAny([]).deleteAny([]);
// Resources: file(s), user(s), airport(s)
ac.grant('basic').readOwn(['user']);

// Student
ac.grant('student').readOwn(['user']).readAny(['airports']);

// Teacher
ac.grant('teacher')
  .createAny([
    'file',
    'airports',
    'aircrafts',
    'employee',
    'flightinstructors',
    'students',
  ])
  .createOwn('user')
  .readAny([
    'users',
    'file',
    'airports',
    'aircrafts',
    'employees',
    'employee',
    'flightinstructors',
    'flightinstructor',
    'students',
  ])
  .readOwn(['user'])
  .updateAny(['airports', 'aircrafts', 'employee'])
  .updateOwn('user')
  .deleteAny(['airports', 'aircrafts', 'employee'])
  .deleteOwn('user');

// Verify if user have permission to perform the request action
exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const { id, role } = await User.findByPk(req.userId);

      // Verify if its own information
      const own =
        JSON.stringify(id) == req.params.id &&
        (ac.can(role).createOwn(resource).granted ||
          ac.can(role).readOwn(resource).granted ||
          ac.can(role).updateOwn(resource).granted ||
          ac.can(role).deleteOwn(resource).granted);

      // Allows user to perform his acctions
      const permission = ac.can(role)[action](resource);
      console.log(permission);
      //  !permission.granted
      // If allows don't have permissions it shows a massage
      if (!permission.granted && !own) {
        return res.status(401).json({
          error:
            'Você não tem permissão para esta ação. Contate o administrador do sistema.',
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
