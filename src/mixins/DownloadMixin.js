export default {
  methods: {
    downloadFile(id, wkt) {
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(wkt)
      );
      element.setAttribute('download', `${id}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
  },
};
