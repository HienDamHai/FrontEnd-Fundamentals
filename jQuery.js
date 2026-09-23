$(document).ready(function () {
  $("#nav").on("click", "button", function () {
    var target = $(this).data("target");
    $("#nav button").removeClass("is-active");
    $(this).addClass("is-active");
    $(".module").removeClass("is-on");
    $("#" + target).addClass("is-on");
    $("html, body").animate({ scrollTop: 0 }, 200);
  });

  $("#themeBtn").on("click", function () {
    var light = $("html").attr("data-theme") === "light";
    $("html").attr("data-theme", light ? "dark" : "light");
    $(this).text(light ? "Switch to light theme" : "Switch to dark theme");
  });

  $("#chatFab").on("click", function () {
    $(this).fadeOut(120);
    $("#chat").css("display", "flex").hide().fadeIn(160);
    $("#chatInput").trigger("focus");
  });
  $("#chatClose").on("click", function () {
    $("#chat").fadeOut(140, function () {
      $("#chatFab").fadeIn(140);
    });
  });
  $("#aiGuideBtn").on("click", function () {
    var open = $("#aiGuide").toggleClass("is-open").hasClass("is-open");
    $(this)
      .attr("aria-expanded", open ? "true" : "false")
      .text(open ? "Hide guide" : "How to get an API key");
  });

  function buildChips(n, $box) {
    $box.empty();
    for (var i = 1; i <= n; i++) {
      $('<div class="chip"></div>').text(i).appendTo($box);
    }
  }
  function renderFx() {
    var mode = $("#fx-mode").val(),
      gap = $("#fx-gap").val(),
      n = $("#fx-count").val();
    $("#fx-gap-v").text(gap + "px");
    $("#fx-count-v").text(n);
    $("[data-when]").hide();
    $('[data-when="' + mode + '"]').show();

    var $st = $("#fx-stage"),
      css;
    buildChips(n, $st);
    $st.removeAttr("style");

    if (mode === "flex") {
      css = {
        display: "flex",
        "flex-direction": $("#fx-dir").val(),
        "flex-wrap": $("#fx-wrap").val(),
        "justify-content": $("#fx-jc").val(),
        "align-items": $("#fx-ai").val(),
        gap: gap + "px",
      };
    } else {
      css = {
        display: "grid",
        "grid-template-columns": $("#gr-cols").val(),
        "align-items": $("#gr-ai").val(),
        gap: gap + "px",
      };
    }
    $st.css(css);

    var text = ".container {\n";
    $.each(css, function (k, v) {
      text += "  " + k + ": " + v + ";\n";
    });
    $("#fx-css").text(text + "}");
  }
  $("#m-flex").on("input change", "select, input", renderFx);
  renderFx();

  /* ════════════════════════════════════════════════════════════════
     02 · JQUERY SHOWCASE
     ════════════════════════════════════════════════════════════════ */
  $("#jq-run").on("click", function () {
    var sel = $.trim($("#jq-sel").val());
    $("#jq-tree span").removeClass("hit");
    if (!sel) return;
    var found;
    try {
      found = $("#jq-real").find(sel);
    } catch (e) {
      $("#jq-count").text("Invalid selector.");
      return;
    }

    $("#jq-tree span").each(function () {
      var raw = $(this).text();
      found.each(
        function () {
          var el = this,
            id = el.id,
            tag = el.tagName.toLowerCase();
          var cls = (el.className || "").split(/\s+/).filter(Boolean);
          var match =
            (id && raw.indexOf('id="' + id + '"') > -1) ||
            (!id &&
              raw.indexOf("<" + tag) > -1 &&
              cls.every(function (c) {
                return raw.indexOf(c) > -1;
              }));
          if (match) $(this).addClass("hit");
        }.bind(this)
      );
    });
    $("#jq-count").text(
      "Found " + found.length + ' element(s) matching "' + sel + '".'
    );
  });
  $("#jq-clear").on("click", function () {
    $("#jq-tree span").removeClass("hit");
    $("#jq-count").text("Highlights cleared.");
  });

  function log(line) {
    var $l = $("#jq-log");
    $l.text(line + "\n" + $l.text());
  }
  $("#m-jq").on("click", "[data-fx]", function () {
    var fx = $(this).data("fx"),
      $t = $("#fx-target");
    if (fx === "fadeToggle") {
      $t.fadeToggle(320);
    }
    if (fx === "slideToggle") {
      $t.slideToggle(320);
    }
    if (fx === "animate") {
      $t.animate({ height: 190 }, 260).animate({ height: 110 }, 260);
    }
    if (fx === "chain") {
      $t.fadeOut(180)
        .fadeIn(180)
        .animate({ height: 160 }, 220)
        .animate({ height: 110 }, 220);
    }
    log('$("#fx-target").' + fx + "()");
  });

  var added = 0;
  $("#jq-add").on("click", function () {
    added++;
    $('<button class="btn dyn"></button>')
      .text("Button #" + added)
      .appendTo("#jq-dyn");
    log("Added button #" + added + " to the DOM");
  });
  $("#jq-dyn").on("click", ".dyn", function () {
    log("Delegation captured: " + $(this).text());
  });

  /* ════════════════════════════════════════════════════════════════
     03 · CSS BOX MODEL
     ════════════════════════════════════════════════════════════════ */
  function renderBm() {
    var m = +$("#bm-m").val(),
      b = +$("#bm-b").val(),
      p = +$("#bm-p").val(),
      w = +$("#bm-w").val(),
      sizing = $("#bm-sizing").val();
    $("#bm-m-v").text(m + "px");
    $("#bm-b-v").text(b + "px");
    $("#bm-p-v").text(p + "px");
    $("#bm-w-v").text(w + "px");

    $(".bm-margin").css("padding", m + "px");
    $(".bm-border").css("padding", b + "px");
    $(".bm-padding").css("padding", p + "px");

    var inner = sizing === "border-box" ? Math.max(0, w - 2 * p - 2 * b) : w;
    $("#bm-content").css({ width: inner + "px", height: "58px" });

    var total = sizing === "border-box" ? w : w + 2 * p + 2 * b;
    $("#bm-css").text(
      ".box {\n  box-sizing: " +
        sizing +
        ";\n  width: " +
        w +
        "px;\n  padding: " +
        p +
        "px;\n  border: " +
        b +
        "px solid;\n  margin: " +
        m +
        "px;\n}\n\n/* actual rendered width: " +
        total +
        "px (excluding margin) */"
    );
  }
  $("#m-box").on("input change", "input, select", renderBm);
  renderBm();

  /* ════════════════════════════════════════════════════════════════
     04 · RESPONSIVE DESIGN
     ════════════════════════════════════════════════════════════════ */
  $("#m-resp")
    .on("click", "[data-vp]", function () {
      var w = $(this).data("vp");
      $("#m-resp [data-vp]").removeClass("btn-solid");
      $(this).addClass("btn-solid");
      $("#vp").attr("data-w", w);
      var cols = {
        mobile: "1fr",
        tablet: "repeat(2, 1fr)",
        desktop: "repeat(4, 1fr)",
      }[w];
      var q = {
        mobile: "@media (max-width: 480px)",
        tablet: "@media (max-width: 768px)",
        desktop: "/* default */",
      }[w];
      $("#vp-css").text(
        q + " {\n  .grid { grid-template-columns: " + cols + "; }\n}"
      );
    })
    .find("[data-vp]")
    .last()
    .trigger("click");

  /* ════════════════════════════════════════════════════════════════
     05 · VANILLA DOM
     ════════════════════════════════════════════════════════════════ */
  var dmCount = 0;
  function dmShow(code) {
    document.getElementById("dm-code").textContent = code;
  }
  document.getElementById("dm-create").addEventListener("click", function () {
    dmCount++;
    var el = document.createElement("div");
    el.className = "chip";
    el.textContent = "Box " + dmCount;
    document.getElementById("dm-stage").appendChild(el);
    dmShow(
      'var el = document.createElement("div");\nel.className = "chip";\nel.textContent = "Box ' +
        dmCount +
        '";\nstage.appendChild(el);'
    );
  });
  document.getElementById("dm-toggle").addEventListener("click", function () {
    document.querySelectorAll("#dm-stage .chip").forEach(function (c) {
      c.classList.toggle("bm-content");
    });
    dmShow(
      'stage.querySelectorAll(".chip")\n  .forEach(c => c.classList.toggle("bm-content"));'
    );
  });
  document.getElementById("dm-style").addEventListener("click", function () {
    document.querySelectorAll("#dm-stage .chip").forEach(function (c) {
      c.style.transform = c.style.transform ? "" : "rotate(-4deg)";
    });
    dmShow('c.style.transform = "rotate(-4deg)";');
  });
  document.getElementById("dm-reset").addEventListener("click", function () {
    document.getElementById("dm-stage").innerHTML = "";
    dmCount = 0;
    dmShow('stage.innerHTML = "";');
  });

  /* ════════════════════════════════════════════════════════════════
     06 · SEMANTIC HTML
     ════════════════════════════════════════════════════════════════ */
  var tags = [
    { t: "header", d: "Introductory content for a page or section" },
    { t: "nav", d: "Group of navigation links" },
    { t: "main", d: "Primary content of the page (one per page)" },
    { t: "article", d: "Self-contained, independently distributable content" },
    { t: "aside", d: "Tangentially related content (sidebar)" },
    { t: "footer", d: "Footer content for a page or section" },
  ];
  var $list = $("#sem-list");
  $.each(tags, function (i, o) {
    $(
      '<div class="ctrl"><label><input type="checkbox" checked data-tag="' +
        o.t +
        '"> &lt;' +
        o.t +
        "&gt; — " +
        o.d +
        "</label></div>"
    ).appendTo($list);
  });
  function renderSem() {
    var out = "Document Structure\n──────────────────\n";
    $("#sem-list input:checked").each(function () {
      var t = $(this).data("tag");
      out +=
        (t === "article" || t === "aside" ? "  └ " : "└ ") + "<" + t + ">\n";
    });
    if (!$("#sem-list input:checked").length)
      out += "(no semantic tags — only <div> elements remain)";
    $("#sem-out").text(out);
  }
  $("#sem-list").on("change", "input", renderSem);
  renderSem();

  /* ════════════════════════════════════════════════════════════════
     07 · CSS SELECTORS & SPECIFICITY
     ════════════════════════════════════════════════════════════════ */
  function calcSpecificity(sel) {
    var a = 0, b = 0, c = 0;
    // Remove :not() wrapper but count its contents
    var cleaned = sel.replace(/:not\(([^)]*)\)/g, " $1 ");
    // Remove pseudo-elements (::before, ::after, etc.)
    cleaned = cleaned.replace(/::[a-z-]+/g, function () { c++; return ""; });
    // Count IDs
    var ids = cleaned.match(/#[a-zA-Z_][\w-]*/g);
    if (ids) a += ids.length;
    cleaned = cleaned.replace(/#[a-zA-Z_][\w-]*/g, "");
    // Count classes, attribute selectors, pseudo-classes
    var classes = cleaned.match(/\.[a-zA-Z_][\w-]*/g);
    if (classes) b += classes.length;
    var attrs = cleaned.match(/\[[^\]]+\]/g);
    if (attrs) b += attrs.length;
    var pseudoClasses = cleaned.match(/:[a-zA-Z-]+(\([^)]*\))?/g);
    if (pseudoClasses) b += pseudoClasses.length;
    cleaned = cleaned.replace(/\.[a-zA-Z_][\w-]*/g, "");
    cleaned = cleaned.replace(/\[[^\]]+\]/g, "");
    cleaned = cleaned.replace(/:[a-zA-Z-]+(\([^)]*\))?/g, "");
    // Count type selectors (element names)
    var types = cleaned.match(/[a-zA-Z][a-zA-Z0-9]*/g);
    if (types) c += types.length;
    return [a, b, c];
  }

  function renderSpecificity(sel) {
    var s = calcSpecificity(sel);
    var $badge = $("#sel-score");
    $badge.find("span").not(".sep").eq(0).text(s[0]);
    $badge.find("span").not(".sep").eq(1).text(s[1]);
    $badge.find("span").not(".sep").eq(2).text(s[2]);

    var parts = [];
    if (s[0]) parts.push(s[0] + " ID" + (s[0] > 1 ? "s" : ""));
    if (s[1]) parts.push(s[1] + " class" + (s[1] > 1 ? "es" : "") + "/attr/pseudo-class");
    if (s[2]) parts.push(s[2] + " type" + (s[2] > 1 ? "s" : "") + "/pseudo-element");

    var explain = 'Selector: "' + sel + '"\nSpecificity: (' + s.join(", ") + ")\n\n";
    if (parts.length) {
      explain += "Breakdown:\n";
      parts.forEach(function (p) { explain += "  • " + p + "\n"; });
    }
    explain += "\nHigher specificity values win.\n";
    explain += "If equal, the last rule in source order wins.";
    $("#sel-explain").text(explain);
  }

  $("#sel-test").on("click", function () {
    renderSpecificity($.trim($("#sel-input").val()));
  });
  $("#m-sel").on("click", "[data-sel]", function () {
    var sel = $(this).data("sel");
    $("#sel-input").val(sel);
    renderSpecificity(sel);
  });

  /* ════════════════════════════════════════════════════════════════
     08 · CSS TRANSITIONS & ANIMATIONS
     ════════════════════════════════════════════════════════════════ */
  function renderAnim() {
    var prop = $("#anim-prop").val();
    var dur = (+$("#anim-dur").val() / 10).toFixed(1);
    var tf = $("#anim-tf").val();
    var rotate = +$("#anim-rotate").val();
    var scale = (+$("#anim-scale").val() / 10).toFixed(1);
    var tx = +$("#anim-tx").val();

    $("#anim-dur-v").text(dur + "s");
    $("#anim-rotate-v").text(rotate + "deg");
    $("#anim-scale-v").text(scale);
    $("#anim-tx-v").text(tx + "px");

    var $box = $("#anim-target");
    $box.css({
      "transition-property": prop,
      "transition-duration": dur + "s",
      "transition-timing-function": tf,
      transform: "rotate(" + rotate + "deg) scale(" + scale + ") translateX(" + tx + "px)"
    });

    var css = ".box {\n";
    css += "  transition: " + prop + " " + dur + "s " + tf + ";\n";
    css += "  transform:\n";
    css += "    rotate(" + rotate + "deg)\n";
    css += "    scale(" + scale + ")\n";
    css += "    translateX(" + tx + "px);\n";
    css += "}";

    var currentKf = $box.css("animation-name");
    if (currentKf && currentKf !== "none") {
      css += "\n\nanimation: " + currentKf + " 1s ease infinite;";
    }
    $("#anim-css").text(css);
  }

  $("#m-anim").on("input change", "select, input", renderAnim);
  $("#m-anim").on("click", "[data-kf]", function () {
    var kf = $(this).data("kf");
    $("#m-anim [data-kf]").removeClass("btn-solid");
    $(this).addClass("btn-solid");
    var $box = $("#anim-target");
    if (kf === "none") {
      $box.css("animation", "none");
    } else {
      $box.css("animation", kf + " 1s ease infinite");
    }
    renderAnim();
  });
  renderAnim();

  /* ════════════════════════════════════════════════════════════════
     09 · JS FUNDAMENTALS
     ════════════════════════════════════════════════════════════════ */
  var jsExamples = {
    vars: function () {
      var x = 1;
      var y = 2;
      var z = 3;
      var results = [];
      results.push("var x = " + x);
      results.push("let y = " + y);
      results.push("const z = " + z);
      if (true) { var a = "visible outside"; }
      results.push('var a (after if block) = "' + a + '"');
      results.push("let b (after if block) = ReferenceError");
      return results.join("\n");
    },
    types: function () {
      var results = [];
      results.push('typeof "hello"     → ' + typeof "hello");
      results.push("typeof 42          → " + typeof 42);
      results.push("typeof true        → " + typeof true);
      results.push("typeof undefined   → " + typeof undefined);
      results.push("typeof null        → " + typeof null);
      results.push("typeof []          → " + typeof []);
      results.push("typeof {}          → " + typeof {});
      results.push("Array.isArray([])  → " + Array.isArray([]));
      return results.join("\n");
    },
    funcs: function () {
      function add(a, b) { return a + b; }
      var multiply = function (a, b) { return a * b; };
      var divide = function (a, b) { return a / b; };
      var results = [];
      results.push("add(3, 4)      = " + add(3, 4));
      results.push("multiply(3, 4) = " + multiply(3, 4));
      results.push("divide(12, 4)  = " + divide(12, 4));
      var mapped = [1, 2, 3].map(function (n) { return n * 10; });
      results.push("[1,2,3].map(n => n*10) = [" + mapped.join(", ") + "]");
      return results.join("\n");
    },
    arrays: function () {
      var nums = [1, 2, 3, 4, 5];
      var results = [];
      results.push("nums = [" + nums.join(", ") + "]");
      results.push(".map(n => n * 2)    → [" + nums.map(function (n) { return n * 2; }).join(", ") + "]");
      results.push(".filter(n => n > 3) → [" + nums.filter(function (n) { return n > 3; }).join(", ") + "]");
      results.push(".find(n => n === 3) → " + nums.find(function (n) { return n === 3; }));
      results.push(".every(n => n > 0)  → " + nums.every(function (n) { return n > 0; }));
      results.push(".some(n => n > 4)   → " + nums.some(function (n) { return n > 4; }));
      results.push(".reduce((s,n) => s+n, 0) → " + nums.reduce(function (s, n) { return s + n; }, 0));
      results.push(".indexOf(3)         → " + nums.indexOf(3));
      results.push(".includes(3)        → " + nums.includes(3));
      return results.join("\n");
    },
    strings: function () {
      var str = "Hello, World!";
      var results = [];
      results.push('str = "' + str + '"');
      results.push(".length           → " + str.length);
      results.push('.toUpperCase()    → "' + str.toUpperCase() + '"');
      results.push('.toLowerCase()    → "' + str.toLowerCase() + '"');
      results.push('.indexOf("World") → ' + str.indexOf("World"));
      results.push('.includes("Hello")→ ' + str.includes("Hello"));
      results.push('.split(", ")      → ["' + str.split(", ").join('", "') + '"]');
      results.push('.slice(0, 5)      → "' + str.slice(0, 5) + '"');
      results.push('.replace("World", "JS") → "' + str.replace("World", "JS") + '"');
      return results.join("\n");
    },
    compare: function () {
      var results = [];
      results.push('"5" == 5          → ' + ("5" == 5));
      results.push("0 == false        → " + (0 == false));
      results.push("null == undefined → " + (null == undefined));
      results.push('"5" === 5         → ' + ("5" === 5));
      results.push("0 === false       → " + (0 === false));
      results.push("true && false     → " + (true && false));
      results.push("true || false     → " + (true || false));
      results.push("!true             → " + !true);
      var age = 20;
      results.push('age=20 → (age>=18 ? "adult" : "minor") → "' + (age >= 18 ? "adult" : "minor") + '"');
      return results.join("\n");
    },
    objects: function () {
      var user = {
        name: "Alice",
        age: 25,
        greet: function () { return "Hi, I'm " + this.name; }
      };
      var results = [];
      results.push('user.name        → "' + user.name + '"');
      results.push('user["age"]      → ' + user["age"]);
      results.push('user.greet()     → "' + user.greet() + '"');
      results.push("Object.keys(user)   → [" + Object.keys(user).map(function (k) { return '"' + k + '"'; }).join(", ") + "]");
      results.push('"name" in user   → ' + ("name" in user));
      return results.join("\n");
    },
    json: function () {
      var obj = { name: "Alice", age: 25 };
      var jsonStr = JSON.stringify(obj);
      var parsed = JSON.parse(jsonStr);
      var results = [];
      results.push("JSON.stringify({name:'Alice', age:25})");
      results.push('  → ' + jsonStr);
      results.push("JSON.parse('" + jsonStr + "')");
      results.push("  → object with name=" + parsed.name + ", age=" + parsed.age);
      results.push("\nfetch() is async — it returns a Promise.");
      results.push("Use .then() to handle the response.");
      return results.join("\n");
    }
  };

  $("#m-jsbasic").on("click", "[data-jsrun]", function () {
    var key = $(this).data("jsrun");
    var $out = $("#js-out-" + key);
    if (jsExamples[key]) {
      try {
        $out.text(jsExamples[key]());
      } catch (e) {
        $out.text("Error: " + e.message);
      }
    }
  });

  /* ════════════════════════════════════════════════════════════════
     AI CHATBOX — Gemini API Integration
     ════════════════════════════════════════════════════════════════ */
  var KEY = "ffl_gemini_key";
  var saved = null;
  try {
    saved = sessionStorage.getItem(KEY);
  } catch (e) {}
  if (saved) $("#apiKey").val(saved);

  $("#apiKey").on("input", function () {
    try {
      sessionStorage.setItem(KEY, $(this).val());
    } catch (e) {}
  });

  function push(text, who) {
    $('<div class="msg"></div>').addClass(who).text(text).appendTo("#chatLog");
    var log = document.getElementById("chatLog");
    log.scrollTop = log.scrollHeight;
  }

  var SYSTEM =
    "You are an assistant that only answers questions about HTML, CSS, JavaScript, and jQuery. " +
    "If the question is outside these four topics, politely decline in one short sentence and invite the user to ask again on topic. " +
    "Keep answers concise and prefer concrete code examples. Answer in English.";

  var MODEL = "gemini-2.5-flash";
  var MAX_ATTEMPTS = 3;
  var TIMEOUT_MS = 30000;

  function isRetryable(status) {
    return (
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    );
  }

  function explain(status, body) {
    var detail = "";
    try {
      var j = JSON.parse(body);
      detail = j.error && j.error.message ? " (" + j.error.message + ")" : "";
    } catch (e) {}

    if (status === 400)
      return (
        "Invalid API key or malformed request. Please check the key you pasted." +
        detail
      );
    if (status === 401 || status === 403)
      return (
        "Key rejected. The key may have been revoked, or the Generative Language API is not enabled." +
        detail
      );
    if (status === 404)
      return (
        'Model "' +
        MODEL +
        '" not found. The model may have been renamed or your key does not have access.' +
        detail
      );
    if (status === 429)
      return (
        "API rate limit / quota exceeded. Wait a moment and try again." +
        detail
      );
    if (status >= 500)
      return "Gemini server is temporarily overloaded or down." + detail;
    return "HTTP error " + status + detail;
  }

  function readResponse(data) {
    var block = data && data.promptFeedback && data.promptFeedback.blockReason;
    if (block) {
      return {
        error:
          "Your question was blocked by Gemini's safety filter (reason: " +
          block +
          "). Try rephrasing.",
      };
    }

    var cand = data && data.candidates && data.candidates[0];
    if (!cand) {
      return {
        error: "Gemini returned no content. Try asking a different question.",
      };
    }

    var reason = cand.finishReason;
    if (
      reason === "SAFETY" ||
      reason === "RECITATION" ||
      reason === "PROHIBITED_CONTENT"
    ) {
      return {
        error:
          "The response was blocked by the content filter (reason: " + reason + ").",
      };
    }

    var parts = cand.content && cand.content.parts;
    var text = parts
      ? parts
          .map(function (p) {
            return p.text || "";
          })
          .join("")
      : "";

    if (!$.trim(text)) {
      return {
        error:
          "Gemini returned empty content" +
          (reason ? " (finishReason: " + reason + ")" : "") +
          ".",
      };
    }
    if (reason === "MAX_TOKENS") {
      return { text: text, truncated: true };
    }
    return { text: text };
  }

  function callGemini(key, question, attempt) {
    attempt = attempt || 1;

    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, TIMEOUT_MS);

    return fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" +
        MODEL +
        ":generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [{ role: "user", parts: [{ text: question }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 800 },
        }),
      }
    )
      .then(function (r) {
        clearTimeout(timer);
        if (r.ok) return r.json();

        return r.text().then(function (body) {
          var err = new Error(explain(r.status, body));
          err.status = r.status;
          throw err;
        });
      })
      .catch(function (err) {
        clearTimeout(timer);
        if (err.name === "AbortError") {
          var t = new Error(
            "Request timed out after " + TIMEOUT_MS / 1000 + " seconds."
          );
          t.status = 0;
          throw t;
        }
        if (typeof err.status === "undefined") {
          err.status = 0;
          err.message = "Cannot connect to Gemini. Check your network.";
        }
        if (
          attempt < MAX_ATTEMPTS &&
          (err.status === 0 || isRetryable(err.status))
        ) {
          return new Promise(function (resolve) {
            setTimeout(resolve, 1000 * attempt);
          }).then(function () {
            return callGemini(key, question, attempt + 1);
          });
        }
        throw err;
      });
  }

  var busy = false;

  $("#chatForm").on("submit", function (e) {
    e.preventDefault();
    if (busy) return;

    var q = $.trim($("#chatInput").val());
    var key = $.trim($("#apiKey").val());
    if (!q) return;
    if (!key) {
      push("Please paste an API key before asking a question.", "sys");
      return;
    }

    busy = true;
    push(q, "me");
    $("#chatInput").val("").prop("disabled", true);
    var $thinking = $('<div class="msg ai">Thinking…</div>').appendTo(
      "#chatLog"
    );

    callGemini(key, q)
      .then(function (data) {
        var r = readResponse(data);
        $thinking.remove();
        if (r.error) {
          push(r.error, "sys");
        } else {
          push(r.text, "ai");
          if (r.truncated)
            push(
              "The response was truncated due to length limits. Ask a narrower question for a complete answer.",
              "sys"
            );
        }
      })
      .catch(function (err) {
        $thinking.remove();
        push(err.message, "sys");
      })
      .then(function () {
        busy = false;
        $("#chatInput").prop("disabled", false).trigger("focus");
      });
  });
});
