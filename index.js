const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const core = require('@actions/core');

(async () => {
    try {
        const apiKey = core.getInput('api-key');
        const version = core.getInput('version');
        const changelog = core.getInput('changelog');
        const files = core
            .getInput('files')
            .split('\n')
            .map((f) => f.trim());

        console.log(version);
        console.log(changelog);
        console.log(files);

        const form = new FormData();

        form.append('version', version);
        form.append('changelog', changelog);
        files.forEach((f) => console.log({ file: f, stat: fs.statSync(f) }));
        files.forEach((f) => form.append(f.match(/ATLauncher-[0-9\.]+\.(exe|jar|zip)/)[1], fs.createReadStream(f)));

        // const { body } = await got.post('https://api.atlauncher.com/v1/admin/admin/launcher-versions', {
        //     body: form,
        //     headers: {
        //         Authorization: `Bearer ${apiKey}`,
        //     },
        //     responseType: 'json',
        // });

        // console.log(body);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
