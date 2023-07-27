var obj = {
    value: "111",
    data: [
        {
            childValue: "111",
            children: [
                {
                    label: "111",
                    text: "111"
                }
            ]
        },
        {
            childValue: "222",
            children: [
                {
                    label: "222",
                    text: "222"
                }
            ]
        }
    ]
}

obj.data[1].children.splice(0,1);

obj.data[1].children.push(
    {
        label: "2222",
        text: "2222"
    }
)

obj.data.splice(1,1);

obj.data.push({
    childValue: "222",
    children: [
        {
            label: "222",
            text: "222"
        }
    ]
})

