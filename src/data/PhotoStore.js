const importAll = (r) => {
    return r.keys().map(r); // Map over all matched files
  };
  
  // Use require.context to import all images from the specified folder
  const images = importAll(require.context('../Images/bathrooms/', false, /\.(heic|jpg|jpeg|png)$/i));
  
  export default images;
  