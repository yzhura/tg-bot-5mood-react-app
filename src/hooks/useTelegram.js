/* eslint-disable no-undef */

const telegram = window.Telegram.WebApp;

export const useTelegram = () => {

    const onClose = () => {
      telegram.close();
    }

    // const onToggleButton = () => {
    //     if(telegram.MainButton.isVisible) {
    //         telegram.MainButton.show();
    //     } else {
    //         telegram.MainButton.hide();
    //     }
    // }

  return {
    onClose,
    // onToggleButton,
    telegram,
    user: telegram?.initDataUnsafe?.user,
    queryId: telegram?.initDataUnsafe?.query_id,
  }
}
