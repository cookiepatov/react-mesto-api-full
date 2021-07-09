const Card = require('../models/card');
const NoRightsError = require('../utils/customErrors/NoRightsError');
const NotFoundError = require('../utils/customErrors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id).orFail(() => { throw new NotFoundError('Карточка по указанному _id не найдена'); })
    .then((cardInfo) => {
      const {
        owner: cardOwner,
      } = cardInfo;
      if (cardOwner.toString() !== req.user._id) {
        throw new NoRightsError('Попытка удалить чужую карточкуd');
      } else {
        Card.findByIdAndRemove(req.params.id)
          .then((answer) => {
            const {
              _id, likes, name, link, owner,
            } = answer;
            res.send({
              _id, likes, name, link, owner,
            });
          })
          .catch(next);
      }
    }).catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ card }))
    .catch(next); //
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => { throw new NotFoundError('Карточка по указанному _id не найдена'); })
    .then((answer) => {
      const {
        _id, likes, name, link, owner,
      } = answer;
      res.send({
        _id, likes, name, link, owner,
      });
    })
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => { throw new NotFoundError('Карточка по указанному _id не найдена'); })
    .then((answer) => {
      const {
        _id, likes, name, link, owner,
      } = answer;
      res.send({
        _id, likes, name, link, owner,
      });
    })
    .catch(next);
};
