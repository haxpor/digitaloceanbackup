# digitaloceanbackup
Automated server script to take snapshot for DigitalOcean server, keep only latest N snapshots to keep cost low

# Why?

Backup server via snapshoting and transfer to Amazon's S3, or Glacier is more costly than directly use snapshoting service provided by DigitalOcean. Due to policy of penalty that will occurred if delete file before 60/90 days as per Amazon; that kills the cheap as-advertised.

Check [DigitalOcean's Pricing](https://www.digitalocean.com/pricing/) for Snapshots, it's listed as $0.05 per GB per month and if it's destroyed before the month over it will be charged per-hour basis just like Droplet. This is way better, and cheaper than Amazon.

Roughly as per my calculation, we can keep it as low as < $5 per month for Droplet with 30GB while keeping 3 latest snapshots. It's mostly a matter of how large the Droplet is.

# Logic Behind

The script will takes setting in `config.json` as for Droplet Ids and number of holding snapshots before deleting into effect. It will make a request to DigitalOcean API for list of all snapshots for target Droplet Id to determine whether it needs to delete old snapshots first before creating a new one (snapshoting a Droplet) or not.

It can happen that such Droplet has many snapshots far exceeding the number of holding snapshots as set in `config.json`. Then it will try to delete all of old snapshots first before proceed to create a new one.

# How to

You first need to create DigitalOcean's access token by going to [API](https://cloud.digitalocean.com/settings/api/) menu.

Then copy that access token, and define on your server's environment variable via

```
export DIGITALOCEAN_ACCESS_TOKEN=<your access token>
```

Better yet, put above command to your `~/.bash_profile` as well to make it taken into effective every bootup.

Clone this repo to your server.

Execute `npm install`.

Create `config.json` file at the same level of `index.js` and configuring it by supplying your Droplet ID, and number of snapshots to hold before deleting oldest ones. See section _Config File (`config.json`)_ for more info of its format.

Execute `node index.js`. You can hook it up via `crontab` as well. Also you can symlink `index.js` to your executable path. It's up to you.

# Config File (`config.json`)

The content of config file is as follows

```
{
	"droplet_ids": [
		"<your droplet id 1>",
		"<your droplet id 2>"
	],
	"hold_snapshots": 3
}
```

Define your `droplet_ids`, it can be just one or multiple.

You can get your Droplet IDs by seeing its API at [List all Droplets](https://developers.digitalocean.com/documentation/v2/#list-all-droplets). Copy `Curl example` and supply with your access token to execute such command. You will get result. Just take your Droplet ids of interest and supply into `config.json`.

# Note

DigitalOcean takes some time to create a snapshot.

From my experience, 30GB in size of server will take almost 20 minutes. During this time, if you try to list all snapshots for Droplet Id, you won't get any which is in-creating progress. So keep in mind to take this period as a non-safe period to execute any script as the script cannot know whether there's any snapshots in creating.

Billing for snapshots also starts from snapshot creation time. Thus be decisive of how frequently you backup, and how many old snapshots you would like to hold with this project. Larger in size snapshot will take longer time to create as well; although cost might be neglectible.

# What's Next?

[x] Make getting Droplet Ids more comfortable and less effort to get. Ideally doesn't involve user to execute API by himself/herself.

# License

Wasin Thonkaew, [MIT](https://github.com/haxpor/digitaloceanbackup/blob/master/LICENSE)
