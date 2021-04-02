/**
 * Created by chenxingyu on 2017/5/6.
 */
exports.Expires = {
    fileMatch: /^(gif|png|jpg|js|css)$/ig,
    maxAge: 60 * 60 * 24 * 365
};
exports.Compress = {
    match: /html/ig
};

exports.Welcome = {
    file: "index.html"
};