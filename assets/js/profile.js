$(function() {
      $('#file-input').on('change', function() {
        const file = this.files[0];

    // Check the file type
    if (!file.type.match(/^image\//)) {
        alert('Please select an image file');
        return;
      }
       

        const reader = new FileReader();
        reader.onload = function() {
          // Convert the file data to a data URL
          const dataUrl = reader.result;

          // Create an image element with the preview data
          const img = $('<img>').attr('src', dataUrl).css('max-width', '100px');

          // Clear the preview element and append the image
          $('#preview').empty().append(img);
        };
        reader.readAsDataURL(file);
      });
    });