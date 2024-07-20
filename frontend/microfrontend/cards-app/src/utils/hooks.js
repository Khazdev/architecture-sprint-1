import { CurrentUserContext } from "../../../../shared-library/src/Components/CurrentUserContext";
import { useContext } from "react";

import { useCloseAllPopups } from "../../../../shared-library/src/utils/hooks"
import api from "../../../../shared-library/src/utils/api";

export function useHandleAddPlaceClick() {
  const context = useContext(CurrentUserContext);
  const {setIsAddPlacePopupOpen} = context;

  return () => {
    setIsAddPlacePopupOpen(true);
  };
}

export function useHandleCardLike(card) {
  const context = useContext(CurrentUserContext);
  const {setCards, currentUser} = context;
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id===currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id===card._id ? newCard:c))
        );
      })
      .catch((err) => console.log(err));
  }
  return handleCardLike(card);
}

export function useHandleCardDelete(card) {
  const context = useContext(CurrentUserContext);
  const {setCards} = context;
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id!==card._id));
      })
      .catch((err) => console.log(err));
  }
  return handleCardDelete(card);
}


export function useHandleAddPlaceSubmit() {
  const context = useContext(CurrentUserContext);
  const {setCards, cards} = context;
  const closeAllPopups = useCloseAllPopups();

  return (newCard) => {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
}

export function useHandleCardClick(card) {
  const context = useContext(CurrentUserContext);
  const {setSelectedCard} = context;
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  return handleCardClick(card);

}
