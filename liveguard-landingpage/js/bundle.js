// bundle.js — dynamic loader + site initialization
// This small loader fetches jQuery and Bootstrap from CDN then runs
// the site's lightweight custom initialization (smooth scroll, preloader,
// modal/demo button wiring). This avoids embedding full libraries here
// while restoring page functionality after the original files were removed.
(function(){
    function loadScript(src, cb){
        var s = document.createElement('script');
        s.src = src;
        s.async = false; // preserve execution order
        s.onload = function(){ cb && cb(null); };
        s.onerror = function(e){ console.error('Failed to load', src, e); cb && cb(e); };
        document.head.appendChild(s);
    }

    // Load jQuery 1.12.4 (compatible with Bootstrap 3.3.6 used in this project)
    loadScript('https://code.jquery.com/jquery-1.12.4.min.js', function(err){
        if(err){ console.warn('jQuery CDN failed — some interactive features may not work.'); }

        // Then load Bootstrap JS (matches bootstrap.min.css in repo)
        loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js', function(err2){
            if(err2){ console.warn('Bootstrap JS CDN failed — modals/collapse may not work.'); }

            // Initialize custom behaviors once jQuery (and Bootstrap) are available
            (function($){
                // Hide preloader when the page fully loads
                $(window).on('load', function(){
                    try{ $('.preloader').fadeOut(300); }catch(e){ /* ignore */ }
                });

                // Simple smooth scroll for links with class .smoothScroll
                $(document).on('click', 'a.smoothScroll', function(e){
                    var href = $(this).attr('href');
                    if(href && href.indexOf('#') === 0){
                        var $target = $(href);
                        if($target.length){
                            e.preventDefault();
                            var offset = Math.max(0, $target.offset().top - 50);
                            $('html, body').animate({ scrollTop: offset }, 600);
                        }
                    }
                });

                // Collapse mobile navbar when a nav link is clicked
                $(document).on('click', '.navbar-collapse a', function(){
                    $('.navbar-collapse').collapse('hide');
                });

                // Wire demo buttons to open the correct modals
                function showModalForId(id){
                    if(id === 'sos-open' || id === 'btn-sos') $('#modal-sos').modal('show');
                    else if(id === 'btn-quick-report') $('#modal-report').modal('show');
                    else if(id === 'missing-open') $('#modal-missing').modal('show');
                    else if(id === 'business-dir') $('#modal-business').modal('show');
                }

                $(document).on('click', '#sos-open, #btn-sos, #btn-quick-report, #missing-open, #business-dir', function(e){
                    e && e.preventDefault && e.preventDefault();
                    showModalForId($(this).attr('id'));
                });

                // Demo send actions — show a small alert and close modal
                $(document).on('click', '#send-sos', function(){
                    $('#modal-sos').modal('hide');
                    window.setTimeout(function(){ alert('Demo SOS sent (simulated).'); }, 150);
                });
                $(document).on('click', '#send-report', function(){
                    $('#modal-report').modal('hide');
                    window.setTimeout(function(){ alert('Demo report sent (simulated).'); }, 150);
                });
                $(document).on('click', '#send-missing', function(){
                    $('#modal-missing').modal('hide');
                    window.setTimeout(function(){ alert('Missing person alert published (demo).'); }, 150);
                });

                // Basic fallback: if there's no jQuery (very unlikely after CDN load), do nothing.
            })(window.jQuery || window.$ || (function(){
                console.warn('jQuery missing — custom initialization skipped.');
                return { on: function(){}, ready: function(f){ if(typeof f === 'function') setTimeout(f,0); }, fn: {} };
            })());
        });
    });
})();
