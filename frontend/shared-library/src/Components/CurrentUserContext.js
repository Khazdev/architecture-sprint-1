import React, { useState } from 'react';

// Объект контекста CurrentUserContext экспортируется из отдельного файла директории contexts
export const CurrentUserContext = React.createContext();

export const CurrentUserContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [tooltipStatus, setTooltipStatus] = useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  return (
    <CurrentUserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        tooltipStatus,
        setTooltipStatus,
        isEditProfilePopupOpen,
        setIsEditProfilePopupOpen,
        isAddPlacePopupOpen,
        setIsAddPlacePopupOpen,
        isEditAvatarPopupOpen, setIsEditAvatarPopupOpen,
        selectedCard, setSelectedCard,
        cards, setCards,
        currentUser, setCurrentUser,
        isInfoToolTipOpen, setIsInfoToolTipOpen
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
