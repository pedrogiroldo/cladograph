/* eslint-disable */
import $ from 'jquery';
export default function saveTree(type, container) {
  var prefix = {
    xmlns: 'http://www.w3.org/2000/xmlns/',
    xlink: 'http://www.w3.org/1999/xlink',
    svg: 'http://www.w3.org/2000/svg',
  };

  function get_styles(doc) {
    function process_stylesheet(ss) {
      try {
        if (ss.cssRules) {
          for (var i = 0; i < ss.cssRules.length; i++) {
            var rule = ss.cssRules[i];
            if (rule.type === 3) {
              // Import Rule
              process_stylesheet(rule.styleSheet);
            } else {
              // hack for illustrator crashing on descendent selectors
              if (rule.selectorText) {
                if (rule.selectorText.indexOf('>') === -1) {
                  styles += '\n' + rule.cssText;
                }
              }
            }
          }
        }
      } catch (e) {
        //console.log("Could not process stylesheet : " + ss);
      }
    }

    var styles = '',
      styleSheets = doc.styleSheets;

    if (styleSheets) {
      for (var i = 0; i < styleSheets.length; i++) {
        process_stylesheet(styleSheets[i]);
      }
    }

    return styles;
  }

  var svg = $(container).find('svg')[0];
  if (!svg) {
    svg = $(container)[0];
  }

  var styles = get_styles(window.document);

  svg.setAttribute('version', '1.1');

  var defsEl = document.createElement('defs');
  svg.insertBefore(defsEl, svg.firstChild);

  var styleEl = document.createElement('style');
  defsEl.appendChild(styleEl);
  styleEl.setAttribute('type', 'text/css');

  // removing attributes so they aren't doubled up
  svg.removeAttribute('xmlns');
  svg.removeAttribute('xlink');

  // These are needed for the svg
  if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns')) {
    svg.setAttributeNS(prefix.xmlns, 'xmlns', prefix.svg);
  }

  if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns:xlink')) {
    svg.setAttributeNS(prefix.xmlns, 'xmlns:xlink', prefix.xlink);
  }

  var source = new XMLSerializer()
    .serializeToString(svg)
    .replace('</style>', '<![CDATA[' + styles + ']]></style>');
  var doctype =
    '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
  var to_download = [doctype + source];
  var image_string =
    'data:image/svg+xml;base66,' + encodeURIComponent(to_download);

  if (type == 'png') {
    b64toBlob(
      image_string,
      function (blob) {
        var url = window.URL.createObjectURL(blob);
        var pom = document.createElement('a');
        pom.setAttribute('download', 'image.png');
        pom.setAttribute('href', url);
        $('body').append(pom);
        pom.click();
        pom.remove();
      },
      function (error) {
        // handle error
      },
    );
  } else {
    var pom = document.createElement('a');
    pom.setAttribute('download', 'image.svg');
    pom.setAttribute('href', image_string);
    $('body').append(pom);
    pom.click();
    pom.remove();
  }
}
