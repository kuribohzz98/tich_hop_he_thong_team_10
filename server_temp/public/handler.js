module.exports.renderSelectOption = function (data) {
    var result = { options: [] };
    var element = {
        text: {
            type: "plain_text",
            text: ""
        },
        value: ""
    }
    result.options = data.map(data_ => {
        let ele = JSON.parse(JSON.stringify(element));
        ele.text.text = data_.name || data_.fullName || data_.color || data_.title;
        ele.value = data_.id;
        return ele;
    })
    return result;
}

module.exports.renderSelectOptionDrive = function (data) {
    var result = { options: [] };
    var element = {
        text: {
            type: "plain_text",
            text: ""
        },
        value: ""
    }
    result.options = data.map(data_ => {
        let ele = JSON.parse(JSON.stringify(element));
        ele.text.text = data_.title + " - " + data.mimeType;
        ele.value = data_.id;
        return ele;
    })
    return result;
}