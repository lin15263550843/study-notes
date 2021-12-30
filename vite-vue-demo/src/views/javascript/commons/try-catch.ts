try {
    throw new Error('抛出异常');
} catch (error) {
    console.log('error', error);
} finally {
    console.log('一定会执行~');
}
