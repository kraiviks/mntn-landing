const DEV_DIR = "src";
const PROD_DIR = "dist";

const path = {
	build: {
		html: PROD_DIR + "/",
		css: PROD_DIR + "/css/",
		js: PROD_DIR + "/js/",
		img: PROD_DIR + "/img/",
		fonts: PROD_DIR + "/fonts/",
	},
	src: {
		html: [DEV_DIR + "/*.html", "!" + DEV_DIR + "/_*.html"],
		css: DEV_DIR + "/scss/style.scss",
		js: DEV_DIR + "/js/script.js",
		img: DEV_DIR + "/img/**/*.{jpg,png,ico,svg,gif,webp}",
		fonts: DEV_DIR + "/fonts/*.ttf",
	},
	watch: {
		html: DEV_DIR + "/*.html",
		css: DEV_DIR + "/scss/**/*.scss",
		js: DEV_DIR + "/js/**/*.js",
		img: DEV_DIR + "/img/**/*.{jpg,png,ico,svg,gif,webp}",
	},
	clean: "./" + PROD_DIR + "/",
};

const { src, dest } = require("gulp"),
	gulp = require("gulp"),
	browserSync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass")(require("sass")),
	autoprefixer = require("gulp-autoprefixer"),
	gcmq = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	webp = require("gulp-webp"),
	webphtml = require("gulp-webp-html");

function serv() {
	browserSync.init({
		server: {
			baseDir: "./" + PROD_DIR + "/",
		},
		port: 3000,
		notify: false,
	});
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70,
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(imagemin())
		.pipe(dest(path.build.img))
		.pipe(browserSync.stream());
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browserSync.stream());
}

function css() {
	return src(path.src.css)
		.pipe(scss({ outputStyle: "expanded" })) // expanded | compressed
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true,
			})
		)
		.pipe(gcmq())
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css",
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream());
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js",
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream());
}


function livereload() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean() {
	return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(css, html, js, images));
const serve = gulp.parallel(build, livereload, serv);

exports.serve = serve;
exports.build = build;
exports.clean = clean;
exports.default = serve;