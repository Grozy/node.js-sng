function NativeModule(id){
    this.filename = id + '.js';
    this.id = id;
    this.exports = {};
    this.loaded = false;
}

NativeModule._source = process.binding('natives');
NativeModule._cache = {};
