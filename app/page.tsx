export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {getCourses()}
        </main>
    );
}

const getCourses = async () => {
    let result = await fetch('http://192.168.123.8:5038/course', {
        method: 'get',
    })
    let res = await result.json() //必须通过此方法才可返回数据
    const {data: {data}} = res
    return data;
}
