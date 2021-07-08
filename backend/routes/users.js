const { celebrate } = require('celebrate');
const router = require('express').Router();

const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUserInfo,
} = require('../controllers/users');
const {
  idParamValidation, changeAvatarValidation, changeProfileValidation,
} = require('../utils/serverValidation');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo);
router.patch('/me', celebrate(changeProfileValidation), updateProfile);
router.get('/:id', celebrate(idParamValidation), getUserById);
router.patch('/me/avatar', celebrate(changeAvatarValidation), updateAvatar);

module.exports = router;
