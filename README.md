# digitaloceanbackup
Automated server script to take snapshot for DigitalOcean server, keep only latest N snapshots to keep cost low

# Why?

Backup server via snapshoting and transfer to Amazon's S3, or Glacier is more costly than directly use snapshoting service provided by DigitalOcean. Due to policy of penalty that will occurred if delete file before 60/90 days as per Amazon; that kills the cheap as-advertised.

Check [DigitalOcean's Pricing](https://www.digitalocean.com/pricing/) for Snapshots, it's listed as $0.05 per GB per month and if it's destroyed before the month over it will be charged per-hour basis just like Droplet. This is way better, and cheaper than Amazon.

Roughly as per my calculation, we can keep it as low as < $5 per month for Droplet with 30GB while keeping 3 latest snapshots. It's mostly a matter of how large the Droplet is.

# License

Wasin Thonkaew, [MIT](https://github.com/haxpor/digitaloceanbackup/blob/master/LICENSE)
