export const generateTempoPassword = () => {
    const specialCharacters = '^$*.[]{}()?-!@#%&/\\,><\':;|_~`+=';
    const LowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    const MayusLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let password = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    password += LowerLetters.charAt(Math.floor(Math.random() * LowerLetters.length));
    password += MayusLetters.charAt(Math.floor(Math.random() * MayusLetters.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));

    while (password.length < 8) {
        const conjuntoCaracteres = specialCharacters + LowerLetters + MayusLetters + numbers;
        password += conjuntoCaracteres.charAt(Math.floor(Math.random() * conjuntoCaracteres.length));
    }

    // Mezclar la password para aumentar la aleatoriedad
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}