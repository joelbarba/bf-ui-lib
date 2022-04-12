// There are of course better options for this, like 'uuid' npm package,
// but to make the library not dependent here's a built in option that should suffice
export const generateId = (idLength) => {
  let result             = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < idLength; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


export const generateUniqueId = (component: string): string => {
  const hexString = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${component}-${hexString}`;
}
