export const likeclickHandler = (e: any) => {
  console.log(e.target.className);
  if (e.target.className === 'like') e.target.classList.remove('like');
  else e.target.classList.add('like');
};
