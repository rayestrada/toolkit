/**
 * @file
 * Add Sharing behavior to share links.
 *
 */

($ => {
  // DOC READY
  $(() => {
    const socialWindow = url => {
      window.open(url, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=700,height=700');
    }

    const setShareLinks = () => {
      const pageUrl = encodeURIComponent(document.URL);
      const metaName = encodeURIComponent($("meta[property='og:site_name']").attr("content"));
      const metaImg = encodeURIComponent($("meta[property='og:image']").attr("content"));

      $(".social-share.linkedin").on("click", e => {
        e.preventDefault();
        url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
        socialWindow(url);
      });

      $(".social-share.pinterest").on("click", e => {
        e.preventDefault();
        url = "https://pinterest.com/pin/create/link/?url=" + pageUrl + "&media=" + metaImg + "&description=" + metaName;
        socialWindow(url);
      });

      $(".social-share.google").on("click", e => {
        e.preventDefault();
        url = "https://plus.google.com/share?url=" + pageUrl;
        socialWindow(url);
      });

      $(".social-share.facebook").on("click", e => {
        e.preventDefault();
        url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
        socialWindow(url);
      });

      $(".social-share.twitter").on("click", e => {
        e.preventDefault();
        url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + metaName;
        socialWindow(url);
      });

      $(".social-share.email").on("click", e => {
        e.preventDefault();
        window.location = "mailto:?subject=" + metaName + "&body=" + pageUrl;
      });
    }

    // Initialize share links.
    setShareLinks();
  });
})(jQuery);
