const { celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { idParamValidation, createCardValidation } = require('../utils/serverValidation');

router.get('/', getCards);
router.delete('/:id', celebrate(idParamValidation), deleteCardById);
router.post('/', celebrate(createCardValidation), createCard);
router.put('/:id/likes', celebrate(idParamValidation), likeCard);
router.delete('/:id/likes', celebrate(idParamValidation), dislikeCard);

module.exports = router;
